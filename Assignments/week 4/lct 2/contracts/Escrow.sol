// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Escrow {
    // address public seller;
    address public buyer;
    address public arbiter;
    uint256 public price;
    bool public isFunded;
    bool public isReleased;

    address public owner;
    address public prevOwner;

    constructor(address _arbiter) payable {
        owner = msg.sender;
        // seller = msg.sender;
        // buyer = _buyer;
        arbiter = _arbiter;
        price = msg.value;
        isFunded = true;
        isReleased = false;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can release funds");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the current owner sell.");
        _;
    }

    function buyTheContractFor0_003ETH() public payable {
        require(
            (msg.sender != owner) && (msg.sender != arbiter),
            "Only a buyer can perform this action!!!"
        );
        require(msg.value == 0.003 * 1e18 wei, "0.003 ETH is required!!!");
        price = msg.value;
        buyer = msg.sender;
    }

    // this allows the owner to reset thr price of the smart contract
    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function sellEscrowContract() public onlyOwner {
        require(price == 0.003 * 1e18 wei, "0.003 ETH is required!!!");
        prevOwner = owner;
        owner = buyer;
    }

    function releaseFunds() external onlyArbiter {
        require(isFunded, "No funds to release");
        require(!isReleased, "Funds already released");

        // this is to confirm that the previous owner has passed ownership to the last buyer
        require(owner == buyer, "Contract is yet to be sold.");

        isReleased = true;
        payable(prevOwner).transfer(price);
    }

    function refundBuyer() external onlyArbiter {
        require(isFunded, "No funds to refund");
        require(!isReleased, "Funds already released");

        isReleased = true;
        payable(buyer).transfer(price);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
