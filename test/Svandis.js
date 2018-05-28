'use strict'
import 'babel-polyfill';

const SvandisToken = artifacts.require('./Svandis.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Svandis Token', function ([holderAddress, recipientAddress, anyAddress]) {

	let token;

	before(async function () {
		token = await SvandisToken.new()
	});


	it('should have the correct setup', async function () {
		(await token.name()).should.be.equal("Svandis");
		(await token.decimals()).should.be.bignumber.equal(18);
		(await token.symbol()).should.be.equal("SVN");
		(await token.version()).should.be.equal("SVN 1.0");
	});

	it('should not transfer token value without a balance', async function() {
		await token.transfer(recipientAddress, 1, {from: holderAddress}).should.be.rejectedWith('revert');
	});


	it('should not transfer from approved token value without a balance and without approval', async function() {
		await token.transferFrom(holderAddress, recipientAddress, 1, {from: holderAddress}).should.be.rejectedWith('revert');
	});


	it('should return a balance of 0 for arbitrary holder address before a sale', async function() {
		(await token.balanceOf(holderAddress, {from: recipientAddress})).should.be.bignumber.equal(0);
	});


	it('should approve a token to be moved from the message sender to a recipient address', async function() {
		await token.approve(recipientAddress, 1, {from: holderAddress}).should.be.fulfilled;
		(await token.allowance(holderAddress, recipientAddress, {from: anyAddress})).should.be.bignumber.equal(1);
	});


	it('should approve ambiguous number of tokens to be alternatively moved from the recipient sender to the holder address', async function() {
		await token.approve(holderAddress, 100, {from: recipientAddress}).should.be.fulfilled;
		(await token.allowance(recipientAddress, holderAddress, {from: anyAddress})).should.be.bignumber.equal(100);
	});


});
