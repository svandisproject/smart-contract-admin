'use strict'
import 'babel-polyfill';

const SvandisSale = artifacts.require('./Sale.sol');

const BigNumber = web3.BigNumber;

function ether (n) {
	return new web3.BigNumber(web3.toWei(n, 'ether'));
}

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Svandis Sale', function ([owner, wallet, buyer1, buyer2, buyer3, buyer4, presaleInvestor1, presaleInvestor2, recipient, anyAddress]) {

	let sale;
	var multiBuyerArray;
	var multiBuyerValue;
	let buyer1Allowed = 500;
	let buyer2Allowed = 1000;
	let buyer3Allowed = 2000;
	let buyer4Allowed = 3000;
	let presaleInvestor1Allowed = 10000;
	let presaleInvestor2Allowed = 20000;

	before(async function () {
		sale = await SvandisSale.new();
		multiBuyerArray = [];
		multiBuyerValue = [];

		multiBuyerArray.push(buyer2);
		multiBuyerArray.push(buyer3);
		multiBuyerArray.push(buyer4);

		multiBuyerValue.push(buyer2Allowed); 
		multiBuyerValue.push(buyer3Allowed); 
		multiBuyerValue.push(buyer4Allowed); 
	});


	it('should return a balance of 0 for arbitrary holder address before a sale', async function() {
		(await sale.balanceOf(buyer1, {from: anyAddress})).should.be.bignumber.equal(0);
	});


	it('should not allow any address to set the withdrawal wallet', async function() {
		await sale.setWithdrawWallet(wallet, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to set the withdrawal wallet', async function() {
		await sale.setWithdrawWallet(wallet, {from: owner}).should.be.fulfilled;
	});


	it('should allow owner to check the 0 contract eth', async function() {
		(await sale.getContractEth()).should.be.bignumber.equal(0);
	});


	it('should reject transferring eth out to withdrawal address when there is no eth in contract', async function() {
		await sale.withdraw(1, {from: wallet}).should.be.rejectedWith('revert');
	});


	it('should reject any non withdrawal address that tried to call withdraw', async function() {
		await sale.withdraw(0, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should reject any non owner address from adding to whitelist', async function() {
		await sale.addToWhitelist(buyer1, buyer1Allowed, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to add to whitelist', async function() {
		await sale.addToWhitelist(buyer1, buyer1Allowed, {from: owner}).should.be.fulfilled;
		(await sale.checkWhitelisted(buyer1, {from: owner})).should.be.bignumber.equal(buyer1Allowed);
	});


	it('should reject any non owner address from adding multiple to whitelist', async function() {
		await sale.addMultipleToWhitelist(multiBuyerArray, multiBuyerValue, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to add multiple to whitelist', async function() {
		await sale.addMultipleToWhitelist(multiBuyerArray, multiBuyerValue, {from: owner}).should.be.fulfilled;

		(await sale.checkWhitelisted(buyer2, {from: owner})).should.be.bignumber.equal(buyer2Allowed);
		(await sale.checkWhitelisted(buyer3, {from: owner})).should.be.bignumber.equal(buyer3Allowed);
		(await sale.checkWhitelisted(buyer4, {from: owner})).should.be.bignumber.equal(buyer4Allowed);
	});


	it('should reject call to add multiple with mismatching array lengths', async function() {
		var newMultiBuyerArray = multiBuyerArray;
		newMultiBuyerArray.push(anyAddress);
		await sale.addMultipleToWhitelist(newMultiBuyerArray, multiBuyerValue, {from: owner}).should.be.rejectedWith('revert');
	});


	it('should reject any non owner address from removing from whitelist', async function() {
		await sale.removeFromWhitelist(buyer1, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to remove from whitelist and add back as needed ', async function() {
		(await sale.checkWhitelisted(buyer1, {from: owner})).should.be.bignumber.equal(buyer1Allowed);
		(await sale.checkWhitelisted(buyer2, {from: owner})).should.be.bignumber.equal(buyer2Allowed);

		await sale.removeFromWhitelist(buyer1, {from: owner}).should.be.fulfilled;
		await sale.removeFromWhitelist(buyer2, {from: owner}).should.be.fulfilled;

		await sale.addToWhitelist(buyer1, buyer1Allowed, {from: owner}).should.be.fulfilled;
		await sale.addToWhitelist(buyer2, buyer2Allowed, {from: owner}).should.be.fulfilled;
		(await sale.checkWhitelisted(buyer1, {from: owner})).should.be.bignumber.equal(buyer1Allowed);
		(await sale.checkWhitelisted(buyer2, {from: owner})).should.be.bignumber.equal(buyer2Allowed);
	});


	it('should reject any non owner address from adding to company whitelist', async function() {
		await sale.addToCompanyWhitelist(presaleInvestor1, presaleInvestor1Allowed, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to add to company whitelist', async function() {
		await sale.addToCompanyWhitelist(presaleInvestor1, presaleInvestor1Allowed, {from: owner}).should.be.fulfilled;
		await sale.addToCompanyWhitelist(presaleInvestor2, presaleInvestor2Allowed, {from: owner}).should.be.fulfilled;

		(await sale.checkCompanyWhitelisted(presaleInvestor1, {from: owner})).should.be.bignumber.equal(presaleInvestor1Allowed);
		(await sale.checkCompanyWhitelisted(presaleInvestor2, {from: owner})).should.be.bignumber.equal(presaleInvestor2Allowed);
	});


	it('should reject any non owner address from removing from company whitelist', async function() {
		await sale.removeFromCompanyWhitelist(presaleInvestor1, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner to remove from company Whitelist and put them back if needed ', async function() {

		(await sale.checkCompanyWhitelisted(presaleInvestor1, {from: owner})).should.be.bignumber.equal(presaleInvestor1Allowed);
		(await sale.checkCompanyWhitelisted(presaleInvestor2, {from: owner})).should.be.bignumber.equal(presaleInvestor2Allowed);

		await sale.removeFromCompanyWhitelist(presaleInvestor1, {from: owner}).should.be.fulfilled;
		await sale.removeFromCompanyWhitelist(presaleInvestor2, {from: owner}).should.be.fulfilled;

		(await sale.checkCompanyWhitelisted(presaleInvestor1, {from: owner})).should.be.bignumber.equal(0);
		(await sale.checkCompanyWhitelisted(presaleInvestor2, {from: owner})).should.be.bignumber.equal(0);

		await sale.addToCompanyWhitelist(presaleInvestor1, presaleInvestor1Allowed, {from: owner}).should.be.fulfilled;
		await sale.addToCompanyWhitelist(presaleInvestor2, presaleInvestor2Allowed, {from: owner}).should.be.fulfilled;
	});


	it('should reject any non owner address from setting presale rate', async function() {
		await sale.setPreSaleRate(100, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to set presale rate', async function() {
		await sale.setPreSaleRate(1000, {from: owner}).should.be.fulfilled;
	});


	it('should reject any non owner address from setting tier rates', async function() {
		await sale.setTiers(100, 100, {from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should allow owner address to set tier rate', async function() {
		await sale.setTiers(550, 150, {from: owner}).should.be.fulfilled;
	});


	it('should allow owner address to reset tier rate', async function() {
		await sale.setTiers(500, 100, {from: owner}).should.be.fulfilled;
	});


	it('should reject any non whitelisted address from buying tokens', async function() {
		await sale.buyTokens({from: anyAddress, value: ether(1)}).should.be.rejectedWith('revert');
	});


	it('should not allow whitelisted addresses to buy more tiered tokens than allowed in presale', async function() {
                await sale.buyTokens({from: buyer2, value: ether(2)}).should.be.rejectedWith('revert');
        });


	it('should allow whitelisted addresses to buy tokens in presale', async function() {
		await sale.buyTokens({from: buyer2, value: ether(1)}).should.be.fulfilled;
		(await sale.balanceOf(buyer2, {from: buyer2})).should.be.bignumber.equal(buyer2Allowed);
	});


        it('should reject any public address to switch tier', async function() {
                await sale.switchTiers(1, {from: anyAddress}).should.be.rejectedWith('revert');
        });


        it('should allow owner to switch to tier 1', async function() {
                await sale.switchTiers(1, {from: owner}).should.be.fulfilled;
        });


        it('should not allow already maxed whitelisted addresses to buy more tokens for rest of sale', async function() {
                await sale.buyTokens({from: buyer2, value: ether(1)}).should.be.rejectedWith('revert');
        });


        it('should allow to make tier 1 purchases', async function() {
                await sale.buyTokens({from: buyer1, value: ether(1)}).should.be.fulfilled;
                (await sale.balanceOf(buyer1, {from: buyer1})).should.be.bignumber.equal(buyer1Allowed);
                await sale.buyTokens({from: buyer3, value: ether(1)}).should.be.fulfilled;
                (await sale.balanceOf(buyer1, {from: buyer1})).should.be.bignumber.equal(buyer1Allowed);//only contribute 1 eth
        });


        it('should allow owner to switch to tier 2', async function() {
                await sale.switchTiers(2, {from: owner}).should.be.fulfilled;
        });


	it('should allow to make tier 2 purchases', async function() {
                await sale.buyTokens({from: buyer3, value: ether(15)}).should.be.fulfilled;
                (await sale.balanceOf(buyer3, {from: buyer3})).should.be.bignumber.equal(buyer3Allowed);
                await sale.buyTokens({from: buyer4, value: ether(20)}).should.be.fulfilled;
                (await sale.balanceOf(buyer4, {from: buyer4})).should.be.bignumber.equal(buyer3Allowed);//only contribute 20 eth
        });


	it('should allow presale investors to claim tokens', async function() {
		await sale.takeCompanyTokensOwnership({from: presaleInvestor1}).should.be.fulfilled;
	});


	it('should not allow any address to disable the sale', async function() {
		await sale.disableSale({from: anyAddress}).should.be.rejectedWith('revert');
	});


	it('should disable the sale', async function() {
		await sale.disableSale({from: owner}).should.be.fulfilled;
	});


        it('should sell no more tokens after the sale, not even with whitelist approval', async function() {
                await sale.buyTokens({from: buyer4, value: ether(1)}).should.be.rejectedWith('revert');
        });


	it('should allow presale investors to claim tokens after sale is over', async function() {
		await sale.takeCompanyTokensOwnership({from: presaleInvestor2}).should.be.fulfilled;
	});


        it('should not allow presale investors to double claim tokens', async function() {
                await sale.takeCompanyTokensOwnership({from: presaleInvestor2}).should.be.fulfilled;
		(await sale.balanceOf(presaleInvestor2, {from:presaleInvestor2})).should.be.bignumber.equal(presaleInvestor2Allowed);
        });

	it('should not allow presale investors to double claim tokens', async function() {
                await sale.takeCompanyTokensOwnership({from: presaleInvestor2}).should.be.fulfilled;
                (await sale.balanceOf(presaleInvestor2, {from:presaleInvestor2})).should.be.bignumber.equal(presaleInvestor2Allowed);
        });


        it('should allow to transfer tokens', async function() {
                await sale.transfer(recipient, 10, {from: buyer1}).should.be.fulfilled;
		(await sale.balanceOf(recipient, {from: anyAddress})).should.be.bignumber.equal(10);
        });


        it('should allow to approve tokens', async function() {
		(await sale.allowance(buyer2, recipient, {from: anyAddress})).should.be.bignumber.equal(0);
                await sale.approve(recipient, 20, {from: buyer2}).should.be.fulfilled;
                (await sale.allowance(buyer2, recipient, {from: anyAddress})).should.be.bignumber.equal(20);
        });


        it('should allow to call transfer from on approved tokens', async function() {
		(await sale.allowance(buyer2, recipient, {from: anyAddress})).should.be.bignumber.equal(20);
                await sale.transferFrom(buyer2, recipient, 20, {from: recipient}).should.be.fulfilled;
                (await sale.allowance(buyer2, recipient, {from: anyAddress})).should.be.bignumber.equal(0);
		(await sale.balanceOf(recipient, {from: anyAddress})).should.be.bignumber.equal(30);
        });

});
