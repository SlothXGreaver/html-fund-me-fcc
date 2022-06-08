// import { ethers } from "./ethers-5.6.esm.min.js";
// import { abi, contractAddress } from "./constants.js";

// const connectButton = document.getElementById("connect-button");
// const fundButton = document.getElementById("fund-button");
// const balanceButton = document.getElementById("balance-button");
// const withdrawButton = document.getElementById("withdraw-button");

// connectButton.onclick = connect;
// fundButton.onclick = fund;
// balanceButton.onclick = balance;
// withdrawButton.onclick = withdraw;

// async function connect() {
//   if (typeof window.ethereum !== "undefined") {
//     try {
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//     } catch (error) {
//       console.log(error);
//     }
//     connectButton.innerHTML = "Connected!";
//     console.log("You have connected a Metamask Wallet");
//   } else {
//     connectButton.innerHTML = "Install Metamask!";
//     console.log("You do not have a Metamask Wallet");
//   }
// }

// async function balance() {
//   if (typeof window.ethereum !== "undefined") {
//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const balance = await provider.getBalance(contractAddress);
//       console.log(ethers.utils.formatEther(balance));
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// async function fund() {
//   const ethAmount = document.getElementById("eth-amount").value;
//   console.log(`Funding Contract with ${ethAmount}`);
//   if (typeof window.ethereum !== "undefined") {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     try {
//       const transactionResponse = await contract.fund({
//         value: ethers.utils.parseEther(ethAmount),
//       });
//       await listenForTransactionMine(transactionResponse, provider);
//       console.log("...Done!");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// async function withdraw() {
//   console.log("Withdrawing Contract Funds...");
//   if (typeof window.ethereum !== "undefined") {
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const contract = new ethers.Contract(contractAddress, abi, signer);
//     try {
//       const transactionResponse = await contract.withdraw();
//       await listenForTransactionMine(transactionResponse, provider);
//       console.log("...Done!");
//     } catch (error) {
//       console.log(error);
//     }
//   } else {
//     withdrawButton.innerHTML = "Install MetaMask";
//   }
// }

// function listenForTransactionMine(transactionResponse, provider) {
//   console.log(`Mining ${transactionResponse.hash}...`);
//   return new Promise((resolve, reject) => {
//     provider.once(transactionResponse.hash, (transactionReceipt) => {
//       console.log(
//         `Completed with ${transactionReceipt.confirmations} confirmations.`
//       );
//       resolve();
//     });
//   });
// }

import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connect-button");
const withdrawButton = document.getElementById("withdraw-button");
const fundButton = document.getElementById("fund-button");
const balanceButton = document.getElementById("balance-button");
connectButton.onclick = connect;
withdrawButton.onclick = withdraw;
fundButton.onclick = fund;
balanceButton.onclick = balance;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install MetaMask";
  }
}

async function withdraw() {
  console.log(`Withdrawing...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.withdraw();
      await listenForTransactionMine(transactionResponse, provider);
    } catch (error) {
      console.log(error);
    }
  } else {
    withdrawButton.innerHTML = "Please install MetaMask";
  }
}

async function fund() {
  const ethAmount = document.getElementById("eth-amount").value;
  console.log(`Funding with ${ethAmount}...`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);
    try {
      const transactionResponse = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      await listenForTransactionMine(transactionResponse, provider);
      console.log(`Funds have been withdrawn and returned to your wallet`);
    } catch (error) {
      console.log(error);
    }
  } else {
    fundButton.innerHTML = "Please install MetaMask";
  }
}

async function balance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    try {
      const balance = await provider.getBalance(contractAddress);
      console.log(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
    }
  } else {
    balanceButton.innerHTML = "Please install MetaMask";
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    provider.once(transactionResponse.hash, (transactionReceipt) => {
      console.log(
        `Completed with ${transactionReceipt.confirmations} confirmations. `
      );
      resolve();
    });
  });
}
