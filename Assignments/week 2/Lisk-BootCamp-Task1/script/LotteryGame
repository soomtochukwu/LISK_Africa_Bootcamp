// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Script, console} from "forge-std/Script.sol";
import {LotteryGame} from "../src/LotteryGame.sol";

contract CounterScript is Script {
    LotteryGame public lotteryGame;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        lotteryGame = new LotteryGame();

        vm.stopBroadcast();
    }
}
