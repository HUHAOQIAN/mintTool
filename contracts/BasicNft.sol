// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BasicNft is ERC721, Ownable {
    string public constant TOKEN_URI =
        "https://ipfs.io/ipfs/QmRFt8eE4abLQ5Xv4WbVVdydvBgKfKqDW1hQkfEr8yamyW";

    uint256 private s_tokenCounter;
    bool public s_mintStart;

    constructor() ERC721("Dogie", "DOG") {
        s_tokenCounter = 0;
        s_mintStart = false;
    }

    function mintStart() public onlyOwner {
        s_mintStart = true;
    }

    function getMintStatus() public view returns (bool) {
        return s_mintStart;
    }

    function mintNft() public returns (uint256) {
        require(s_mintStart = true, "not start");
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata:URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
