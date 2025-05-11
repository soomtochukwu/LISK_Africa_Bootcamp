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
exports.listen = void 0;
const ethers_1 = require("ethers");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const var_1 = require("./var");
const //
PRIVATE_KEY = process.env.PRIVATE_KEY, CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS, RPC_URL = process.env.RPC_URL;
const listen = () => __awaiter(void 0, void 0, void 0, function* () {
    const //
    provider = new ethers_1.ethers.JsonRpcProvider(RPC_URL), contract = new ethers_1.ethers.Contract(CONTRACT_ADDRESS, var_1.ABI, provider);
    // await contract.on("Withdrawn", async (address, amount) => {
    //   console.log(">>", address, "withdrew", amount);
    //   console.log(">> heisting now");
    // });
    console.log("<< retrying in 5 sec");
    console.log(yield contract.lastWithdrawer());
});
exports.listen = listen;
(0, exports.listen)();
