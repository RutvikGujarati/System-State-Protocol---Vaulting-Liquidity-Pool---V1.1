// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract vlpPLSToken is ERC20 {
    constructor() ERC20("vlpPLS-Token", "vlpPLS") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function burn(address account, uint256 value) public {
        _burn(account, value);
    }

    function balanceOF(address user) public view returns (uint256) {
        return balanceOf(user);
    }

    function approving(address user, address contracts, uint256 amount) public {
        _approve(user, contracts, amount);
    }
}
