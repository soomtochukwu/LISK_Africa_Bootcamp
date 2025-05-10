"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.heist = exports.listen = void 0;
exports.withdraw = withdraw;
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const var_1 = require("./var");
const //
PRIVATE_KEY = process.env.PRIVATE_KEY, CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS, RPC_URL = process.env.RPC_URL;
function withdraw() {
    return __awaiter(this, void 0, void 0, function* () {
        const provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL);
        const wallet = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider);
        const contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, var_1.ABI, wallet);
        console.log(`heisting ETH :): ${wallet.address}`);
        try {
            const tx = yield contract.withdraw();
            console.log("Transaction sent:", yield tx.hash);
            const receipt = yield tx.wait();
            console.log("Transaction mined in block:", receipt.blockNumber);
            (0, exports.listen)();
        }
        catch (err) {
            // @ts-ignore
            console.log(err.shortMessage);
            (0, exports.listen)();
        }
    });
}
const listen = () => __awaiter(void 0, void 0, void 0, function* () {
    const //
    provider = new ethers_1.ethers.WebSocketProvider(RPC_URL), contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, var_1.ABI, provider);
    console.log(">> listening");
    yield contract.on("Withdrawn", (address, amount) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(">>", address, "withdrew", amount);
        console.log(">> heisting now");
        withdraw();
    }));
});
exports.listen = listen;
const heist = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    withdraw();
});
exports.heist = heist;
(0, exports.heist)();
