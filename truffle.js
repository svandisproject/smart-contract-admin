// Allows us to use ES6 in our migrations and tests.
require('babel-register')

const HDWalletProvider = require("./tools/svandis-hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*' // Match any network id
    },
    kovan: {
      provider: function() {
            return new HDWalletProvider(process.env.mnemonic, process.env.ethereumnode, 0, 3)
      },
      network_id: 42,
      gas: 6000000, // High gas to get it through
      gasPrice: 0x05
    }
  }
}
