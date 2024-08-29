import Web3 from "web3";
import Certificate from "./Certificate.json"; // Ensure path is correct

let web3;
let contract;

if (window.ethereum) {
  web3 = new Web3(window.ethereum);
  window.ethereum.enable().then(() => {
    console.log("DApp connected");
  }).catch((e) => {
    console.error("User denied access", e);
  });
} else if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
}

const networkId = Object.keys(Certificate.networks)[0];
const network = Certificate.networks[networkId];

if (network && network.address) {
  contract = new web3.eth.Contract(Certificate.abi, network.address);
  console.log("Contract connected:", network.address);
} else {
  console.error("Contract not deployed on the selected network.");
}

export { web3, contract };
