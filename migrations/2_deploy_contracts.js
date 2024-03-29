const config = require('../deployment-config.json');
var Sale = artifacts.require("./Sale.sol");

module.exports = function(deployer) {
  deployer.deploy(Sale);
  deployer.then(function() {
	return Sale.deployed();
  }).then(function(instance) {
        return instance.setOwner(config.owner);
  });
};
