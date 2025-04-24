# Lisk BootCamp Task 1

# Project Images

> ## Compilation Success
>
> <img src="./jpegs/compiled-successfully.png" alt="Image showing successful compilation" />

<br>
<br>

> ## 100% Test Score
>
> <img src="./jpegs/all-test-passed.png" alt="Image showing 100% test score" />

<br>
<br>

> ## I also added a custom event to indicate when a user makes a correct guess
>
> <img src="./jpegs/event.png" alt="..." />
> <img src="./jpegs/emitEvent.png" alt="..." />

<br>
<br>

> Deploying
>
> ```bash
>    clear ; source .env ; forge create --rpc-url $RPC_URL --private-key $PRIVATE_KEY src/LotteryGame.sol:LotteryGame --broadcast
> ```
>
> Address: 0x750C9349D2300032913af321d9EA309025A43FF5

<br>
<br>

> Verifying
>
> ```bash
>    forge verify-contract   --rpc-url https://rpc.sepolia-api.lisk.com   --verifier blockscout   --verifier-url 'https://sepolia-blockscout.lisk.com/api/'   0x750C9349D2300032913af321d9EA309025A43FF5   src/LotteryGame.sol:LotteryGame
> ```
>
> [Verified contract address](https://sepolia-blockscout.lisk.com/address/0x750c9349d2300032913af321d9ea309025a43ff5)
