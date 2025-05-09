"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCorrectHash = void 0;
const ethers_1 = require("ethers");
const var_1 = require("./var");
const findCorrectHash = () => {
    return var_1.words.map((word) => {
        (0, ethers_1.keccak256)((0, ethers_1.solidityPacked)(["string"], [word]));
    });
};
exports.findCorrectHash = findCorrectHash;
