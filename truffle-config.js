module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 6721975,    // Increase gas limit
    },
  },
  compilers: {
    solc: {
      version: "0.8.0", // Make sure this matches your Solidity version
    },
  },
};
