import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { writeFileSync } from "fs";
import { ABI } from "./var";
const //
  PRIVATE_KEY = process.env.PRIVATE_KEY!,
  CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS,
  RPC_URL = process.env.RPC_URL;

export async function withdraw() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS as string, ABI, wallet);
  console.log(`heisting ETH :): ${wallet.address}`);
  try {
    const tx = await contract.withdraw();
    console.log("Transaction sent:", await tx.hash);
    const receipt = await tx.wait();
    console.log("Transaction mined in block:", receipt.blockNumber);

    listen();
  } catch (err) {
    // @ts-ignore
    console.error(err.shortMessage);
    listen();
  }
}

export const listen = async () => {
  // const //
  // provider = new ethers.JsonRpcProvider(RPC_URL),
  // contract = new ethers.Contract(CONTRACT_ADDRESS as string, ABI, provider);
  // await contract.on("Withdrawn", async (address, amount) => {
  //   console.log(">>", address, "withdrew", amount);
  //   console.log(">> heisting now");
  // });
  console.log("<< retrying in 30 sec");

  setTimeout(() => {
    withdraw();
  }, 1000 * 30);
};

export const heist = async () => {
  console.clear();
  withdraw();
};

heist();
