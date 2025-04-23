import { ethers } from "hardhat";

async function main() {
  const Counter = await ethers.deployContract("Counter");

  await Counter.waitForDeployment();

  console.log("Counter Contract Deployed at " + Counter.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
