// Allows us to use ES6 in our migrations and tests.
require('babel-register')

const HDWalletProvider = require("truffle-hdwallet-provider");
const LedgerWalletProvider = require("truffle-ledger-provider");
const config = require('./deployment-config.json');

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    kovan: {
      provider: function() {
            return new HDWalletProvider(config.mnemonic, config.ethereumnode, 0)
      },
      network_id: 42,
      gas: 6000000, // High gas to get it through
      gasPrice: 0x05
    },
    ledger_kovan: {
      provider: new LedgerWalletProvider(
      {
            //Ledger Options
            networkId: 42,
            accountsOffset: 0, // we use the first address
            askConfirm: false,
            accountsLength: 2
      },
      config.ethereumnode
      ),
      network_id: 42,
      gas: 6000000,
      gasPrice: 0x05
      }
    }
}
