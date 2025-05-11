const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Access", function () {
  it("Only the current Owner should be able to sell", async function () {
    const [deployer] = await ethers.getSigners();

    const arbiter = ethers.Wallet.createRandom().address;
    const buyer = ethers.Wallet.createRandom().address;

    const escrow = await ethers.deployContract("Escrow", [arbiter]);
    const owner = await escrow.owner();

    console.log("Deployer:", deployer.address);
    console.log("Owner from contract:", owner);
    console.log("Arbiter:", arbiter);
    console.log("Buyer:", buyer);

    expect(owner).to.equal(deployer.address);
  });
});
