import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
import { writeFileSync } from "fs";
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const RPC_URL = process.env.RPC_URL;
const CONTRACT_ABI = [
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS as string,
    CONTRACT_ABI,
    wallet
  );
  console.log(`heisting ETH :): ${wallet.address}`);
  try {
    const tx = await contract.withdraw();
    console.log("Transaction sent:", tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined in block:", receipt.blockNumber);
    setTimeout(() => {
      main();
    }, 1000 * 60 * 60);
  } catch (err) {
    writeFileSync("./errLog.json", JSON.stringify(err), "utf8");
    // @ts-ignore
    await console.error(err["shortMessage"]);
    setTimeout(() => {
      main();
    }, 1000 * 60 * 60);
  }
}
(() => {
  console.clear();
  main();
})();
