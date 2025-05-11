import { expect } from "chai";
import hre from "hardhat";
import { Contract } from "ethers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"; // ✅ correct import

describe("Escrow contract tests", async function () {
  let //
    deployer: HardhatEthersSigner,
    arbiter: HardhatEthersSigner,
    buyer: HardhatEthersSigner,
    escrow: any;

  beforeEach(async () => {
    [deployer, arbiter, buyer] = await hre.ethers.getSigners();
    /* escrow = await hre.ethers.deployContract("Escrow", [
      await arbiter.address,
    ]); */
    escrow = await hre.ethers.deployContract("Escrow", [arbiter.address]);
    await escrow.connect(buyer).buyTheContractFor0_003ETH({
      value: hre.ethers.parseEther("0.003"),
    });
    // escrow.
  });

  it("confirm that owner is deployer", async function () {
    expect(await escrow.owner()).to.equal(await deployer.getAddress());
  });

  it("assert that the owner and arbiter cannot buy the smart contract", async function () {
    await expect(
      escrow.connect(deployer).buyTheContractFor0_003ETH({
        value: hre.ethers.parseEther("0.003"),
      })
    ).to.be.revertedWith("Only a buyer can perform this action!!!");

    await expect(
      escrow.connect(arbiter).buyTheContractFor0_003ETH({
        value: hre.ethers.parseEther("0.003"),
      })
    ).to.be.revertedWith("Only a buyer can perform this action!!!");
  });

  //
  it("contract balance can only be 0 or 0.0003ETH", async () => {
    expect(await escrow.getBalance()).to.equal(hre.ethers.parseEther("0.003"));
    expect(await escrow.getBalance()).to.equal(hre.ethers.parseEther("0.003"));
  });
  //
  it("cannot distribute funds if contract has not been sold", async () => {
    await expect(escrow.connect(arbiter).releaseFunds()).to.be.revertedWith(
      "Contract is yet to be sold."
    );
  });
  //
  it("can distribute funds if contract has been sold", async () => {
    await escrow.connect(deployer).sellEscrowContract();

    await expect(escrow.connect(arbiter).releaseFunds()).to.not.be.reverted;
  });
});
