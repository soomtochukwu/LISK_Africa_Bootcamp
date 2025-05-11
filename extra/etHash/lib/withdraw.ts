import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { ABI } from "./var";
const //
  PRIVATE_KEY = process.env.PRIVATE_KEY,
  CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS,
  RPC_URL = process.env.RPC_URL;
export async function withdraw() {
  const //
    provider = new ethers.JsonRpcProvider(RPC_URL),
    wallet = new ethers.Wallet(PRIVATE_KEY as string, provider),
    contract = new ethers.Contract(CONTRACT_ADDRESS as string, ABI, wallet);
  console.log(`heisting ETH :): ${wallet.address}`);
  console.clear();
  try {
   ( Number(await provider.getBalance(CONTRACT_ADDRESS as string)) / 1e18) < 0.003 ?() => { return "no more ETH to heist."} : null;
    console.log(
      `
      Last withdrawer: ${String(await contract.lastWithdrawer())}
    `
    );
    console.log(
      `...starting new heist
      Current balance`,
      Number(await provider.getBalance(await wallet.getAddress())) / 1e18,
      `ETH`
    );
    const tx = await contract.withdraw();
    console.log(">> Transaction sent:", await tx.hash);
    const receipt = await tx.wait();
    console.log(">> Transaction mined in block:", receipt.blockNumber);
    console.log(
      `
      New balance`,
      Number(await provider.getBalance(await wallet.getAddress())) / 1e18,
      `ETH`
    );
    console.log(
      `
      Last heist: ${new Date(Date.now()).toLocaleString()}
    `
    );
    console.log(
      `
      ETH remaining in EtherVault: ${String(Number(await provider.getBalance(CONTRACT_ADDRESS as string))/1e18)} ETH
    `
    );
    
    listen();
  } catch (err) {
    // @ts-ignore
    console.error(err.shortMessage);
    listen();
  }
}
export const listen = async () => {
  try{
    const //
    provider = new ethers.JsonRpcProvider(RPC_URL),
    contract = new ethers.Contract(CONTRACT_ADDRESS as string, ABI, provider);
  String(await contract.lastWithdrawer()) !==
  "0x8a371e00cd51E2BE005B86EF73C5Ee9Ef6d23FeB"
    ? withdraw()
    : listen();
  }catch(err) {
    // @ts-ignore
    console.error(err.shortMessage);
    listen();
  }
  
};
export const heist = async () => {
  console.clear();
  console.log("...Monitoring last withdrawal.");
  listen();
};
heist();
