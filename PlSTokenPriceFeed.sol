// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
All individuals engaging in the minting of state tokens and recording their wallet address on the smart contract hereby consent to participate in this endeavour a.k.a "experiment" and to contribute towards the advancement of humanities understanding of blockchain technology are fully aware that they shall be reimbursed for the initial inscription expenditure and shall not have any expectation of rewards.
*/
contract PLSTokenPriceFeed {
    uint256 private priceInUSD;
    address private BackendOperationAddress;
    constructor() {
        priceInUSD = 1000000000000000;
        // priceInUSD = 1 ether;
        BackendOperationAddress = 0xb9B2c57e5428e31FFa21B302aEd689f4CA2447fE;
    }
    modifier onlyBackend(){
    require(msg.sender == BackendOperationAddress, "Only backend operation can call this function.");
        _;
    }
    function updatePrice(uint256 _newPriceInUSD) external onlyBackend {
        priceInUSD = _newPriceInUSD;
    }

    function getPrice() external view returns (uint256) {
        return priceInUSD;
    }

}
