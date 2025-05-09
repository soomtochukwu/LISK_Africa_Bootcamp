import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { writeFileSync } from "fs";
import { ABI } from "./var";
const //
  PRIVATE_KEY = process.env.PRIVATE_KEY!,
  CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS,
  RPC_URL = process.env.RPC_URL;

export async function main() {
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS as string, ABI, wallet);
  console.log(`heisting ETH :): ${wallet.address}`);
  try {
    const tx = await contract.withdraw();
    console.log("Transaction sent:", await tx.hash);

    const receipt = await tx.wait();
    console.log("Transaction mined in block:", receipt.blockNumber);
    await setTimeout(() => {
      main();
    }, 4000);
    console.clear();
  } catch (err) {
    // @ts-ignore
    await console.error(err["shortMessage"]);
    await writeFileSync("./errLog.json", JSON.stringify(err), "utf8");
    const lastWithdrawalTime: number = await contract
        .lastWithdrawalTime()
        .then((e) => Number(e)),
      nextHeistTime = lastWithdrawalTime + 3600,
      currentDate = Date.now() / 1000,
      executingIn = nextHeistTime - currentDate + 3,
      checkTime = async () => {
        const //
          currentDate = Date.now() / 1000,
          nextHeistTime = lastWithdrawalTime + 3600,
          executingIn = nextHeistTime - currentDate + 3;
        process.stdout.cursorTo(
          process.stdout.columns - 1 - process.stdout.columns,
          process.stdout.rows - 15
        );
        process.stdout.write(
          `${"executing in...".padEnd(20)} ${Math.floor(
            executingIn / 60
          )} minute(s) ${executingIn <= 60 ? executingIn : ""} sec(s)`.padEnd(
            20
          )
        );
        console.log("");
        console.log("");
        setTimeout(() => {
          checkTime();
        }, 1000);
      };

    await console.log(
      "lastWithdrawalTime".padEnd(20),
      new Date(lastWithdrawalTime * 1000).toString()
    );
    await console.log(
      "next heist".padEnd(20),
      new Date(nextHeistTime * 1000).toString()
    );

    setTimeout(async () => {
      main();
    }, executingIn * 1000);
    checkTime();
  }
}
(() => {
  console.clear();
  main();
})();
