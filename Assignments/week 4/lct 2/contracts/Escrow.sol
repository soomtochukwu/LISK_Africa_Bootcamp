// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Escrow {
    // address public seller;
    address public buyer;
    address public arbiter;
    uint256 public price;
    bool public isFunded;
    bool public isReleased;

    bool public interest;

    address public owner;
    address public prevOwner;

    constructor(address _arbiter) {
        owner = msg.sender;
        arbiter = _arbiter;
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
        if ((msg.sender == owner) && (msg.sender == arbiter)) {
            payable(msg.sender).transfer(msg.value);            
        }
        require(
            (msg.sender != owner) && (msg.sender != arbiter),
            "Only a buyer can perform this action!!!"
        );
        require(msg.sender != buyer, "You cannot buy more than once in a roll!!");
        require(msg.value == 0.003 * 1e18 wei, "0.003 ETH is required!!!");
        price = msg.value;
        isFunded = true;
        buyer = msg.sender;
        interest = true;
    }

    function stillInterested ()  public {
        require(msg.sender == buyer, "Only buyer can change interest");
        interest = true;
    }
    function noLongerInterested ()  public {
        require(msg.sender == buyer, "Only buyer can change interest");
        interest = false;
    }

    // this allows the owner to reset thr price of the smart contract
    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function sellEscrowContract() public onlyOwner {
        require(price == 0.003 * 1e18 wei, "0.003 ETH is required!!!");
        require(interest, "Buyer is no longer interested.");
        prevOwner = owner;
        owner = buyer;
    }

    function releaseFunds() external onlyArbiter {
        require(isFunded, "No funds to release");
        require(!isReleased, "Funds already released");
        require(interest, "Buyer is no longer interested.");

        // this is to confirm that the previous owner has passed ownership to the last buyer
        require(owner == buyer, "Contract is yet to be sold.");

        isFunded = false;
        payable(prevOwner).transfer(price);
    }

    function refundBuyer() external onlyArbiter {
        require(isFunded, "No funds to refund");
        require(!interest, "Buyer is still interested.");

        isFunded = false;
        payable(buyer).transfer(price);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
