import { ethers, network } from "hardhat";
import fs from 'fs';
import path from 'path';
import { MarriageAndDivorce, MarriageNFTImplementation } from "../typechain-types";
import { NetworkConfig } from "hardhat/types";

const contractDetailsDataPath = path.join(__dirname, "../", "../", "app", "src", "app", "contractInfo", "MarriageAndDivorceDetails.json");
const abiDetailsDataPath = path.join(__dirname, "../", "../", "app", "src", "app", "abi", "MarriageAndDivorceABI.json");
const abiPath = path.join(__dirname, "../", "artifacts", "contracts", "MarriageAndDivorce.sol", "MarriageAndDivorce.json");

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

  // Deploy MarriageNFTImplementation first
  const marriageNFT: MarriageNFTImplementation = await ethers.deployContract("MarriageNFTImplementation", []);
  await marriageNFT.waitForDeployment();
  console.log(`MarriageNFTImplementation deployed to ${marriageNFT.target}`);

  // Deploy MarriageAndDivorce with MarriageNFTImplementation address
  const marriageAndDivorce: MarriageAndDivorce = await ethers.deployContract("MarriageAndDivorce", [marriageNFT.target]);
  await marriageAndDivorce.waitForDeployment();
  console.log(`MarriageAndDivorce deployed to ${marriageAndDivorce.target}`);

  jsonObject.contractAddress = marriageAndDivorce.target + "";
  jsonObject.explorerLink = `${chainIdToExplorer[chainIdNumber] ?? chainIdToExplorer[0]}${marriageAndDivorce.target}`;
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
