// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorToken is ERC20, Ownable {
    address ArtNFT;

    constructor(
        address initialOwner,
        address _ArtNFT
    )
        // Since the tutor did not specify the token symbol, I have chosen CT_AN (CreatorToken for ArtNFT)
        ERC20("CreatorToken", "CT_AN")
        Ownable(initialOwner)
    {
        ArtNFT = _ArtNFT;
    }

    modifier onlyArtNFT() {
        require(
            msg.sender == ArtNFT,
            "Only ArtNFT contract can reward creators"
        );
        _;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function rewardCreator(address to, uint256 amount) external onlyArtNFT {
        mint(to, amount);
    }

    function updateArtNFTAddress(address _ArtNFT) public onlyOwner {
        ArtNFT = _ArtNFT;
    }
}
