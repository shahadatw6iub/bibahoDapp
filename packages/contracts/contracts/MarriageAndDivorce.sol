// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MarriageNFTImplementation.sol";

contract MarriageAndDivorce is Ownable {
    struct Marriage {
        uint256 marriageId;
        address bride;
        address groom;
        uint256 brideNID;
        uint256 groomNID;
        uint256 date;
        bool isDivorced;
        bool brideSigned;
        bool groomSigned;
        bool judgeSignedDivorce;
    }

    uint256 private _currentId = 0;
    mapping(uint256 => Marriage) public marriages;
    mapping(address => uint256[]) public marriageIdsByPerson;
    MarriageNFTImplementation public marriageNFT;

    event MarriageProposed(uint256 marriageId, address indexed bride, address indexed groom, uint256 brideNID, uint256 groomNID, uint256 date);
    event MarriageRegistered(uint256 marriageId, address indexed bride, address indexed groom, uint256 date);
    event DivorceRegistered(uint256 marriageId, uint256 date);

    constructor(address marriageNFTAddress) Ownable(msg.sender) {
        marriageNFT = MarriageNFTImplementation(marriageNFTAddress);
    }

    function proposeMarriage(address bride, uint256 brideNID, address groom, uint256 groomNID) public returns (uint256) {
        require(bride != address(0) && groom != address(0), "Invalid addresses");

        _currentId++;
        marriages[_currentId] = Marriage({
            marriageId: _currentId,
            bride: bride,
            groom: groom,
            brideNID: brideNID,
            groomNID: groomNID,
            date: block.timestamp,
            isDivorced: false,
            brideSigned: false,
            groomSigned: false,
            judgeSignedDivorce: false
        });

        marriageIdsByPerson[bride].push(_currentId);
        marriageIdsByPerson[groom].push(_currentId);

        emit MarriageProposed(_currentId, bride, groom, brideNID, groomNID, block.timestamp);
        return _currentId;
    }

    function _existsMarriage(uint256 marriageId) internal view returns (bool) {
        return marriages[marriageId].bride != address(0) && marriages[marriageId].groom != address(0);
    }

    function signMarriage(uint256 marriageId) public {
        require(_existsMarriage(marriageId), "Marriage does not exist");
        require(msg.sender == marriages[marriageId].bride || msg.sender == marriages[marriageId].groom, "Only bride or groom can sign");

        if (msg.sender == marriages[marriageId].bride) {
            marriages[marriageId].brideSigned = true;
        } else if (msg.sender == marriages[marriageId].groom) {
            marriages[marriageId].groomSigned = true;
        }

        if (marriages[marriageId].brideSigned && marriages[marriageId].groomSigned) {
            string memory metadata = marriageNFT.generateMetadata(
                marriageId,
                marriages[marriageId].bride,
                marriages[marriageId].groom,
                marriages[marriageId].brideNID,
                marriages[marriageId].groomNID,
                marriages[marriageId].date,
                marriages[marriageId].isDivorced,
                marriages[marriageId].brideSigned,
                marriages[marriageId].groomSigned,
                marriages[marriageId].judgeSignedDivorce
            );

            marriageNFT.mintNFT(marriages[marriageId].bride, metadata);
            marriageNFT.mintNFT(marriages[marriageId].groom, metadata);

            emit MarriageRegistered(marriageId, marriages[marriageId].bride, marriages[marriageId].groom, block.timestamp);
        }
    }

    function proposeDivorce(uint256 marriageId) public {
        require(_existsMarriage(marriageId), "Marriage does not exist");
        require(msg.sender == marriages[marriageId].bride || msg.sender == marriages[marriageId].groom, "Only bride or groom can propose divorce");

        if (msg.sender == marriages[marriageId].bride) {
            marriages[marriageId].brideSigned = true;
        } else if (msg.sender == marriages[marriageId].groom) {
            marriages[marriageId].groomSigned = true;
        }

        if (marriages[marriageId].brideSigned && marriages[marriageId].groomSigned) {
            finalizeDivorce(marriageId);
        }
    }

    function finalizeDivorce(uint256 marriageId) public onlyOwner {
        require(_existsMarriage(marriageId), "Marriage does not exist");
        require(marriages[marriageId].brideSigned && marriages[marriageId].groomSigned, "Both bride and groom must sign");

        marriages[marriageId].isDivorced = true;
        marriages[marriageId].judgeSignedDivorce = true;

        emit DivorceRegistered(marriageId, block.timestamp);

        // Generate and mint divorce NFT
        string memory divorceMetadata = marriageNFT.generateDivorceMetadata(
            marriageId,
            marriages[marriageId].bride,
            marriages[marriageId].groom,
            block.timestamp
        );

        marriageNFT.mintDivorceNFT(marriages[marriageId].bride, divorceMetadata);
        marriageNFT.mintDivorceNFT(marriages[marriageId].groom, divorceMetadata);
    }
}
