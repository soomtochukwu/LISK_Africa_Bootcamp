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

    struct PinnedArt {
        uint256 tokenId;
        string uri;
        address creator;
    }

    event newMint(address indexed user, uint256 tokenId);
    mapping(uint256 => PinnedArt) _pinedArts;

    constructor(
        address initialOwner
    ) ERC721("ArtNFT", "AN") Ownable(initialOwner) {} // I have chosen this Token name and symbol because the tutor did not specify any

    function setCreatorTokenAddress(address creatorToken_) public onlyOwner {
        _creatorToken = creatorToken_;
    }

    function safeMint(string memory uri, uint256 tokenId) public {
        // uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        require(_creatorToken != address(0), "CreatorToken address not set");
        ICreatorToken(_creatorToken).rewardCreator(
            _pinedArts[tokenId].creator,
            26 * 1e18
        ); // Since the tutor did not specify the amount of tokens to reward creators with,
        // I am choosing 26 CT_AN because this assignment will be due on the 26th
        emit newMint(msg.sender, tokenId);
    }

    function pinArt(string memory ipfs) public {
        uint256 tokenId = _nextTokenId++;
        _pinedArts[tokenId] = PinnedArt(tokenId, ipfs, msg.sender);
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
