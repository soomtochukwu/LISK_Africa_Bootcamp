import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { writeFileSync } from "fs";
import { ABI } from "./var";
const //
  PRIVATE_KEY = process.env.PRIVATE_KEY!,
  CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS,
  RPC_URL = process.env.RPC_URL;

export const listen = async () => {
  const //
    provider = new ethers.JsonRpcProvider(RPC_URL),
    contract = new ethers.Contract(CONTRACT_ADDRESS as string, ABI, provider);
  // await contract.on("Withdrawn", async (address, amount) => {
  //   console.log(">>", address, "withdrew", amount);
  //   console.log(">> heisting now");
  // });
  console.log("<< retrying in 5 sec");
  console.log(await contract.lastWithdrawer());
};

listen();
