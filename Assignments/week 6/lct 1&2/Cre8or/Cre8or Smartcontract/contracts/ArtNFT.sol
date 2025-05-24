// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface ICreatorToken {
    function rewardCreator(address to, uint256 amount) external;
}

contract ArtNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;
    address private _creatorToken;

    struct metadata {
        string uri;
        address creator;
        uint256 tokenId;
    }
    metadata[] private allMetadata;

    // I am using this specific event name because the tutor did not specify a name for the event
    // and I am choosing to use a name that is descriptive of the event
    event newArt(address indexed creator, uint256 tokenId, string uri);

    constructor(
        address initialOwner
    ) ERC721("ArtNFT", "AN") Ownable(initialOwner) {} // I have chosen this Token name and symbol because the tutor did not specify any

    function setCreatorTokenAddress(address creatorToken_) public onlyOwner {
        _creatorToken = creatorToken_;
    }

    function safeMint(string memory uri) public onlyOwner returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        allMetadata.push(metadata(uri, msg.sender, tokenId));
        // Reward the creator with tokens for creating the NFT
        require(_creatorToken != address(0), "CreatorToken address not set");
        // Since the tutor did not specify the amount of tokens to reward creators with,
        // I am choosing 26 CT_AN because this assignment will be due on the 26th
        ICreatorToken(_creatorToken).rewardCreator(msg.sender, 26 * 1e18);
        emit newArt(msg.sender, tokenId, uri);
        return tokenId;
    }

    function getAllMetadata() public view returns (metadata[] memory) {
        return allMetadata;
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
