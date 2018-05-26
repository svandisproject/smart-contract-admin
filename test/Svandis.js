'use strict'
import 'babel-polyfill';

const SvandisToken = artifacts.require('./Svandis.sol');

const BigNumber = web3.BigNumber;

const should = require('chai')
	.use(require('chai-as-promised'))
	.use(require('chai-bignumber')(BigNumber))
	.should();

contract('Svandis Token', function () {

	let token;

	beforeEach(async function () {
		token = await SvandisToken.new()
	});


	it('should have the correct setup', async function () {
		(await token.name()).should.be.equal("Svandis");
		(await token.decimals()).should.be.bignumber.equal(18);
		(await token.symbol()).should.be.equal("SVN");
		(await token.version()).should.be.equal("SVN 1.0");
	});

});
