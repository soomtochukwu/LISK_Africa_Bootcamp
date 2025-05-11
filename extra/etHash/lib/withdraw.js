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
        const //
        provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL), wallet = new ethers_1.ethers.Wallet(PRIVATE_KEY, provider), contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, var_1.ABI, wallet);
        console.log(`heisting ETH :): ${wallet.address}`);
        console.clear();
        try {
            console.log(`...starting new heist
      Current balance`, Number(yield provider.getBalance(yield wallet.getAddress())) / 1e18, `ETH`);
            const tx = yield contract.withdraw();
            console.log(">> Transaction sent:", yield tx.hash);
            const receipt = yield tx.wait();
            console.log(">> Transaction mined in block:", receipt.blockNumber);
            console.log(`
      New balance`, Number(yield provider.getBalance(yield wallet.getAddress())) / 1e18, `ETH`);
            console.log(`
      Last heist: ${new Date(Date.now()).toLocaleString()}
    `);
            (0, exports.listen)();
        }
        catch (err) {
            // @ts-ignore
            console.error(err.shortMessage);
            (0, exports.listen)();
        }
    });
}
const listen = () => __awaiter(void 0, void 0, void 0, function* () {
    const //
    provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL), contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, var_1.ABI, provider);
    String(yield contract.lastWithdrawer()) !==
        "0x8a371e00cd51E2BE005B86EF73C5Ee9Ef6d23FeB"
        ? withdraw()
        : (0, exports.listen)();
});
exports.listen = listen;
const heist = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("...Monitoring last withdrawal." );
    (0, exports.listen)();
});
exports.heist = heist;
(0, exports.heist)();
