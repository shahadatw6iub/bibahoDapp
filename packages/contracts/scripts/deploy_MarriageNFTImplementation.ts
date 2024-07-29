import { ethers, network } from "hardhat";
import fs from 'fs';
import path from 'path';
import { MarriageNFTImplementation } from "../typechain-types";
import { NetworkConfig } from "hardhat/types";

const contractDetailsDataPath = path.join(__dirname, "../", "../", "app", "src", "app", "contractInfo", "MarriageNFTDetails.json");
const abiDetailsDataPath = path.join(__dirname, "../", "../", "app", "src", "app", "abi", "MarriageNFTABI.json");
const abiPath = path.join(__dirname, "../", "artifacts", "contracts", "MarriageNFTImplementation.sol", "MarriageNFTImplementation.json");

const abiRead = fs.readFileSync(abiPath, 'utf8');

const chainIdToExplorer: { [key: number]: string } = {
  59141: "https://sepolia.lineascan.build/address/",
  11155111: "https://sepolia.etherscan.io/address/",
  0: "Unknown/"
}

async function main() {
  // Get the chain ID directly from the network provider
  const chainId = await network.provider.send("eth_chainId");
  const chainIdNumber = parseInt(chainId, 16); // Convert hex string to number
  
  const jsonObject = { contractAddress: "", explorerLink: "" }

  const marriageNFT: MarriageNFTImplementation = await ethers.deployContract("MarriageNFTImplementation", []);

  await marriageNFT.waitForDeployment();
  console.log(`MarriageNFT deployed to ${marriageNFT.target}`);

  jsonObject.contractAddress = marriageNFT.target + "";
  jsonObject.explorerLink = `${chainIdToExplorer[chainIdNumber] ?? chainIdToExplorer[0]}${marriageNFT.target}`;
  const abiObject = JSON.parse(abiRead).abi;
  const updatedJsonData = JSON.stringify(jsonObject, null, 2);
  const abiObjectData = JSON.stringify(abiObject, null, 2);
  fs.writeFileSync(abiDetailsDataPath, abiObjectData, 'utf8');
  fs.writeFileSync(contractDetailsDataPath, updatedJsonData, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
