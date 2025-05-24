const hre = require("hardhat");
const { verify } = require("../utils/verify.js");
require("dotenv").config();

const initialOwner = "0x8a371e00cd51e2be005b86ef73c5ee9ef6d23feb";

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  // Deploy ArtNFT
  const ArtNFT = await hre.ethers.deployContract("ArtNFT", [deployer.address]);
  await ArtNFT.waitForDeployment();
  console.log("ArtNFT Contract Deployed at " + ArtNFT.target);

  // Deploy CreatorToken
  const CreatorToken = await hre.ethers.deployContract("CreatorToken", [
    deployer.address,
    ArtNFT.target,
  ]);
  await CreatorToken.waitForDeployment();
  console.log("CreatorToken Contract Deployed at " + CreatorToken.target);

  // Verify contracts (optional, only if you have an etherscan key and on testnet/mainnet)

  if (network.name !== "hardhat" && network.name !== "localhost") {
    console.log("Verifying contracts...");
    await verify(ArtNFT.target, [initialOwner], "contracts/ArtNFT.sol:ArtNFT");
    await verify(
      CreatorToken.target,
      [initialOwner, ArtNFT.target],
      "contracts/CreatorToken.sol:CreatorToken"
    );
  } else {
    console.log("Skipping verification on local network");
  }

  // Get ArtNFT contract instance connected with deployer signer
  const artNFT = await hre.ethers.getContractAt(
    "ArtNFT",
    ArtNFT.target,
    deployer
  );

  // Call setCreatorTokenAddress on ArtNFT
  const tx = await artNFT.setCreatorTokenAddress(CreatorToken.target);
  await tx.wait(1); // wait for 1 confirmation
  console.log(`✅ setCreatorTokenAddress called: ${CreatorToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
