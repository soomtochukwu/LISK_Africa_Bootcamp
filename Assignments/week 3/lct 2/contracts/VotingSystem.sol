// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Ownable {
    address public owner;
    modifier OnlyOwner() {
        require(msg.sender == owner, "ACCESS DENIED!!!");
        _;
    }
}

contract VotingSystem is Ownable {
    // I introduced this variable to track IDs.
    // It starts from 1.
    uint private idCounter = 1;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) private candidates;
    // mapping(uint => Candidate) private candidates is private because there is a function to get candidate

    mapping(address => bool) public voters;

    constructor() {
        // this is where I initialized the owner variable that was inherited form the base contract
        owner = msg.sender;
    }

    function addCandidate(string calldata name) public OnlyOwner {
        candidates[idCounter] = Candidate({
            id: idCounter,
            name: name,
            voteCount: 0
        });

        // I update idCounter each time i add a new candidate.
        idCounter += 1;
    }

    function vote(uint candidateId) public {
        require(!(voters[msg.sender]), "YOU CAN ONLY VOTE ONCE !!!");
        require(candidates[candidateId].id > 0, "INVALID ID !!!");
        candidates[candidateId].voteCount += 1;
        voters[msg.sender] = true ;
    }

    function getCandidate(
        uint candidateId
    ) public view returns (string memory name, uint voteCount) {
        return (
            candidates[candidateId].name,
            candidates[candidateId].voteCount
        );
    }

    function getTotalCandidates() public view returns (uint) {
        // This should work :).
        return idCounter - 1;
    }
}
