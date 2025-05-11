// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract Escrow {
    // address public seller;
    address public buyer;
    address public arbiter;
    uint256 public amount;
    bool public isFunded;
    bool public isReleased;

    address public owner;
    address public prevOwner;

    constructor(address _arbiter) {
        owner = msg.sender;
        // seller = msg.sender;
        // buyer = _buyer;
        arbiter = _arbiter;
        // amount = msg.value;
        isFunded = true;
        isReleased = false;
    }

    modifier onlyArbiter() {
        require(
            (msg.sender == arbiter) || (msg.sender == owner),
            "Only arbiter can release funds"
        );
        _;
    }

    function buyTheContractFor0_003ETH() public payable {
        require(
            (msg.sender != owner) || (msg.sender != arbiter),
            "Only a buyer can perform this action!!!"
        );
        require(msg.value == 0.003 * 1e18 wei, "0.003 ETH is required!!!");
        amount = msg.value;
        buyer = msg.sender;
    }

    function sellEscrowContract() public onlyArbiter {
        require(
            msg.sender == owner,
            "Only The Owner can Sell The Smart Contract."
        );
        require(amount == 0.003 * 1e18 wei, "0.003 ETH is required!!!");
        prevOwner = owner;
        owner = buyer;
    }

    function releaseFunds() external onlyArbiter {
        require(isFunded, "No funds to release");
        require(!isReleased, "Funds already released");

        // this is to confirm that the previous owner has passed ownership to the last buyer
        require(owner == buyer, "Contract is yet to be sold.");

        isReleased = true;
        payable(prevOwner).transfer(amount);
    }

    function refundBuyer() external onlyArbiter {
        require(isFunded, "No funds to refund");
        require(!isReleased, "Funds already released");

        isReleased = true;
        payable(buyer).transfer(amount);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
