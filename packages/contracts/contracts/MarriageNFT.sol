// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract MarriageNFT is ERC721URIStorage, Ownable {
    uint256 private _currentId = 0;

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(address to, string memory metadata) public onlyOwner returns (uint256) {
        _currentId++;
        _mint(to, _currentId);
        _setTokenURI(_currentId, metadata);
        return _currentId;
    }

    function mintDivorceNFT(address to, string memory metadata) public onlyOwner returns (uint256) {
        _currentId++;
        _mint(to, _currentId);
        _setTokenURI(_currentId, metadata);
        return _currentId;
    }

    function generateMetadata(
        uint256 marriageId,
        address bride,
        address groom,
        uint256 brideNID,
        uint256 groomNID,
        uint256 date,
        bool isDivorced,
        bool brideSigned,
        bool groomSigned,
        bool judgeSignedDivorce
    ) public pure returns (string memory) {
        string memory metadata = string(abi.encodePacked(
            '{"name": "Marriage Certificate #', uint2str(marriageId), '",',
            '"description": "Marriage certificate between ', addressToString(bride), ' and ', addressToString(groom), '",',
            '"image": "ipfs://path_to_image",',
            '"attributes": [',
                '{"trait_type": "Bride Address", "value": "', addressToString(bride), '"},',
                '{"trait_type": "Groom Address", "value": "', addressToString(groom), '"},',
                '{"trait_type": "Bride NID", "value": "', uint2str(brideNID), '"},',
                '{"trait_type": "Groom NID", "value": "', uint2str(groomNID), '"},',
                '{"trait_type": "Date", "value": "', uint2str(date), '"},',
                '{"trait_type": "Is Divorced", "value": "', isDivorced ? "true" : "false", '"},',
                '{"trait_type": "Bride Signed", "value": "', brideSigned ? "true" : "false", '"},',
                '{"trait_type": "Groom Signed", "value": "', groomSigned ? "true" : "false", '"},',
                '{"trait_type": "Judge Signed Divorce", "value": "', judgeSignedDivorce ? "true" : "false", '"}'
            ']}'
        ));
        return metadata;
    }

    function generateDivorceMetadata(
        uint256 marriageId,
        address bride,
        address groom,
        uint256 date
    ) public pure returns (string memory) {
        string memory metadata = string(abi.encodePacked(
            '{"name": "Divorce Certificate #', uint2str(marriageId), '",',
            '"description": "Divorce certificate between ', addressToString(bride), ' and ', addressToString(groom), '",',
            '"image": "ipfs://path_to_image",',
            '"attributes": [',
                '{"trait_type": "Bride Address", "value": "', addressToString(bride), '"},',
                '{"trait_type": "Groom Address", "value": "', addressToString(groom), '"},',
                '{"trait_type": "Date", "value": "', uint2str(date), '"}',
            ']}'
        ));
        return metadata;
    }

    function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - _i / 10 * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function addressToString(address _addr) internal pure returns (string memory) {
        bytes32 value = bytes32(uint256(uint160(_addr)));
        bytes memory alphabet = "0123456789abcdef";

        bytes memory str = new bytes(51);
        str[0] = '0';
        str[1] = 'x';
        for (uint256 i = 0; i < 20; i++) {
            str[2+i*2] = alphabet[uint8(value[i + 12] >> 4)];
            str[3+i*2] = alphabet[uint8(value[i + 12] & 0x0f)];
        }
        return string(str);
    }
}
