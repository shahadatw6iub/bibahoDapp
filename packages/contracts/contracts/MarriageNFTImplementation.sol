// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./MarriageNFT.sol";

contract MarriageNFTImplementation is MarriageNFT {
    constructor() MarriageNFT("MarriageNFT", "MNFT") Ownable(msg.sender) {}
}
