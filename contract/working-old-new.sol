// SPDX-License-Identifier: SEE LICENSE IN LICENSE

// File: PLSTokenPriceFeed.sol

pragma solidity ^0.8.0;

contract PLSTokenPriceFeed {
    uint256 private priceInUSD;
    address private BackendOperationAddress;

    constructor() {
        priceInUSD = 1000000000000000;
        // priceInUSD = 1 ether;
        BackendOperationAddress = 0xb9B2c57e5428e31FFa21B302aEd689f4CA2447fE;
    }

    modifier onlyBackend() {
        require(
            msg.sender == BackendOperationAddress,
            "Only backend operation can call this function."
        );
        _;
    }

    function updatePrice(uint256 _newPriceInUSD) external onlyBackend {
        priceInUSD = _newPriceInUSD;
    }

    function getPrice() external view returns (uint256) {
        return priceInUSD;
    }
}

// File: @openzeppelin/contracts/utils/math/SafeMath.sol

// OpenZeppelin Contracts (last updated v4.9.0) (utils/math/SafeMath.sol)

pragma solidity ^0.8.0;

// CAUTION
// This version of SafeMath should only be used with Solidity 0.8 or later,
// because it relies on the compiler's built in overflow checks.

/**
 * @dev Wrappers over Solidity's arithmetic operations.
 *
 * NOTE: `SafeMath` is generally not needed starting with Solidity 0.8, since the compiler
 * now has built in overflow checking.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryAdd(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function trySub(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, with an overflow flag.
     *
     * _Available since v3.4._
     */
    function tryMul(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
            // benefit is lost if 'b' is also tested.
            // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
            if (a == 0) return (true, 0);
            uint256 c = a * b;
            if (c / a != b) return (false, 0);
            return (true, c);
        }
    }

    /**
     * @dev Returns the division of two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryDiv(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a / b);
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers, with a division by zero flag.
     *
     * _Available since v3.4._
     */
    function tryMod(
        uint256 a,
        uint256 b
    ) internal pure returns (bool, uint256) {
        unchecked {
            if (b == 0) return (false, 0);
            return (true, a % b);
        }
    }

    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     *
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        return a + b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return a - b;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     *
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        return a * b;
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator.
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return a / b;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return a % b;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {trySub}.
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     *
     * - Subtraction cannot overflow.
     */
    function sub(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b <= a, errorMessage);
            return a - b;
        }
    }

    /**
     * @dev Returns the integer division of two unsigned integers, reverting with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function div(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a / b;
        }
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * reverting with custom message when dividing by zero.
     *
     * CAUTION: This function is deprecated because it requires allocating memory for the error
     * message unnecessarily. For custom revert reasons use {tryMod}.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     *
     * - The divisor cannot be zero.
     */
    function mod(
        uint256 a,
        uint256 b,
        string memory errorMessage
    ) internal pure returns (uint256) {
        unchecked {
            require(b > 0, errorMessage);
            return a % b;
        }
    }
}

// File: @openzeppelin/contracts/interfaces/draft-IERC6093.sol

// OpenZeppelin Contracts (last updated v5.0.0) (interfaces/draft-IERC6093.sol)
pragma solidity ^0.8.20;

/**
 * @dev Standard ERC20 Errors
 * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC20 tokens.
 */
interface IERC20Errors {
    /**
     * @dev Indicates an error related to the current `balance` of a `sender`. Used in transfers.
     * @param sender Address whose tokens are being transferred.
     * @param balance Current balance for the interacting account.
     * @param needed Minimum amount required to perform a transfer.
     */
    error ERC20InsufficientBalance(
        address sender,
        uint256 balance,
        uint256 needed
    );

    /**
     * @dev Indicates a failure with the token `sender`. Used in transfers.
     * @param sender Address whose tokens are being transferred.
     */
    error ERC20InvalidSender(address sender);

    /**
     * @dev Indicates a failure with the token `receiver`. Used in transfers.
     * @param receiver Address to which tokens are being transferred.
     */
    error ERC20InvalidReceiver(address receiver);

    /**
     * @dev Indicates a failure with the `spender`’s `allowance`. Used in transfers.
     * @param spender Address that may be allowed to operate on tokens without being their owner.
     * @param allowance Amount of tokens a `spender` is allowed to operate with.
     * @param needed Minimum amount required to perform a transfer.
     */
    error ERC20InsufficientAllowance(
        address spender,
        uint256 allowance,
        uint256 needed
    );

    /**
     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.
     * @param approver Address initiating an approval operation.
     */
    error ERC20InvalidApprover(address approver);

    /**
     * @dev Indicates a failure with the `spender` to be approved. Used in approvals.
     * @param spender Address that may be allowed to operate on tokens without being their owner.
     */
    error ERC20InvalidSpender(address spender);
}

/**
 * @dev Standard ERC721 Errors
 * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC721 tokens.
 */
interface IERC721Errors {
    /**
     * @dev Indicates that an address can't be an owner. For example, `address(0)` is a forbidden owner in EIP-20.
     * Used in balance queries.
     * @param owner Address of the current owner of a token.
     */
    error ERC721InvalidOwner(address owner);

    /**
     * @dev Indicates a `tokenId` whose `owner` is the zero address.
     * @param tokenId Identifier number of a token.
     */
    error ERC721NonexistentToken(uint256 tokenId);

    /**
     * @dev Indicates an error related to the ownership over a particular token. Used in transfers.
     * @param sender Address whose tokens are being transferred.
     * @param tokenId Identifier number of a token.
     * @param owner Address of the current owner of a token.
     */
    error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner);

    /**
     * @dev Indicates a failure with the token `sender`. Used in transfers.
     * @param sender Address whose tokens are being transferred.
     */
    error ERC721InvalidSender(address sender);

    /**
     * @dev Indicates a failure with the token `receiver`. Used in transfers.
     * @param receiver Address to which tokens are being transferred.
     */
    error ERC721InvalidReceiver(address receiver);

    /**
     * @dev Indicates a failure with the `operator`’s approval. Used in transfers.
     * @param operator Address that may be allowed to operate on tokens without being their owner.
     * @param tokenId Identifier number of a token.
     */
    error ERC721InsufficientApproval(address operator, uint256 tokenId);

    /**
     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.
     * @param approver Address initiating an approval operation.
     */
    error ERC721InvalidApprover(address approver);

    /**
     * @dev Indicates a failure with the `operator` to be approved. Used in approvals.
     * @param operator Address that may be allowed to operate on tokens without being their owner.
     */
    error ERC721InvalidOperator(address operator);
}

/**
 * @dev Standard ERC1155 Errors
 * Interface of the https://eips.ethereum.org/EIPS/eip-6093[ERC-6093] custom errors for ERC1155 tokens.
 */
interface IERC1155Errors {
    /**
     * @dev Indicates an error related to the current `balance` of a `sender`. Used in transfers.
     * @param sender Address whose tokens are being transferred.
     * @param balance Current balance for the interacting account.
     * @param needed Minimum amount required to perform a transfer.
     * @param tokenId Identifier number of a token.
     */
    error ERC1155InsufficientBalance(
        address sender,
        uint256 balance,
        uint256 needed,
        uint256 tokenId
    );

    /**
     * @dev Indicates a failure with the token `sender`. Used in transfers.
     * @param sender Address whose tokens are being transferred.
     */
    error ERC1155InvalidSender(address sender);

    /**
     * @dev Indicates a failure with the token `receiver`. Used in transfers.
     * @param receiver Address to which tokens are being transferred.
     */
    error ERC1155InvalidReceiver(address receiver);

    /**
     * @dev Indicates a failure with the `operator`’s approval. Used in transfers.
     * @param operator Address that may be allowed to operate on tokens without being their owner.
     * @param owner Address of the current owner of a token.
     */
    error ERC1155MissingApprovalForAll(address operator, address owner);

    /**
     * @dev Indicates a failure with the `approver` of a token to be approved. Used in approvals.
     * @param approver Address initiating an approval operation.
     */
    error ERC1155InvalidApprover(address approver);

    /**
     * @dev Indicates a failure with the `operator` to be approved. Used in approvals.
     * @param operator Address that may be allowed to operate on tokens without being their owner.
     */
    error ERC1155InvalidOperator(address operator);

    /**
     * @dev Indicates an array length mismatch between ids and values in a safeBatchTransferFrom operation.
     * Used in batch transfers.
     * @param idsLength Length of the array of token identifiers
     * @param valuesLength Length of the array of token amounts
     */
    error ERC1155InvalidArrayLength(uint256 idsLength, uint256 valuesLength);
}

// File: @openzeppelin/contracts/utils/Context.sol

// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

pragma solidity ^0.8.20;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _contextSuffixLength() internal view virtual returns (uint256) {
        return 0;
    }
}

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

pragma solidity ^0.8.20;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * The initial owner is set to the address provided by the deployer. This can
 * later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    /**
     * @dev The caller account is not authorized to perform an operation.
     */
    error OwnableUnauthorizedAccount(address account);

    /**
     * @dev The owner is not a valid owner account. (eg. `address(0)`)
     */
    error OwnableInvalidOwner(address owner);

    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );

    /**
     * @dev Initializes the contract setting the address provided by the deployer as the initial owner.
     */
    constructor(address initialOwner) {
        if (initialOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(initialOwner);
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        if (owner() != _msgSender()) {
            revert OwnableUnauthorizedAccount(_msgSender());
        }
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby disabling any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        if (newOwner == address(0)) {
            revert OwnableInvalidOwner(address(0));
        }
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

// File: @openzeppelin/contracts/token/ERC20/IERC20.sol

// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/IERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the value of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the value of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves a `value` amount of tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 value) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    /**
     * @dev Sets a `value` amount of tokens as the allowance of `spender` over the
     * caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 value) external returns (bool);

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to` using the
     * allowance mechanism. `value` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) external returns (bool);
}

// File: @openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol

// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/extensions/IERC20Metadata.sol)

pragma solidity ^0.8.20;

/**
 * @dev Interface for the optional metadata functions from the ERC20 standard.
 */
interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

// File: @openzeppelin/contracts/token/ERC20/ERC20.sol

// OpenZeppelin Contracts (last updated v5.0.0) (token/ERC20/ERC20.sol)

pragma solidity ^0.8.20;

/**
 * @dev Implementation of the {IERC20} interface.
 *
 * This implementation is agnostic to the way tokens are created. This means
 * that a supply mechanism has to be added in a derived contract using {_mint}.
 *
 * TIP: For a detailed writeup see our guide
 * https://forum.openzeppelin.com/t/how-to-implement-erc20-supply-mechanisms/226[How
 * to implement supply mechanisms].
 *
 * The default value of {decimals} is 18. To change this, you should override
 * this function so it returns a different value.
 *
 * We have followed general OpenZeppelin Contracts guidelines: functions revert
 * instead returning `false` on failure. This behavior is nonetheless
 * conventional and does not conflict with the expectations of ERC20
 * applications.
 *
 * Additionally, an {Approval} event is emitted on calls to {transferFrom}.
 * This allows applications to reconstruct the allowance for all accounts just
 * by listening to said events. Other implementations of the EIP may not emit
 * these events, as it isn't required by the specification.
 */
abstract contract ERC20 is Context, IERC20, IERC20Metadata, IERC20Errors {
    mapping(address account => uint256) private _balances;

    mapping(address account => mapping(address spender => uint256))
        private _allowances;

    uint256 private _totalSupply;

    string private _name;
    string private _symbol;

    /**
     * @dev Sets the values for {name} and {symbol}.
     *
     * All two of these values are immutable: they can only be set once during
     * construction.
     */
    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    /**
     * @dev Returns the name of the token.
     */
    function name() public view virtual returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view virtual returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the number of decimals used to get its user representation.
     * For example, if `decimals` equals `2`, a balance of `505` tokens should
     * be displayed to a user as `5.05` (`505 / 10 ** 2`).
     *
     * Tokens usually opt for a value of 18, imitating the relationship between
     * Ether and Wei. This is the default value returned by this function, unless
     * it's overridden.
     *
     * NOTE: This information is only used for _display_ purposes: it in
     * no way affects any of the arithmetic of the contract, including
     * {IERC20-balanceOf} and {IERC20-transfer}.
     */
    function decimals() public view virtual returns (uint8) {
        return 18;
    }

    /**
     * @dev See {IERC20-totalSupply}.
     */
    function totalSupply() public view virtual returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev See {IERC20-balanceOf}.
     */
    function balanceOf(address account) public view virtual returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev See {IERC20-transfer}.
     *
     * Requirements:
     *
     * - `to` cannot be the zero address.
     * - the caller must have a balance of at least `value`.
     */
    function transfer(address to, uint256 value) public virtual returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, value);
        return true;
    }

    /**
     * @dev See {IERC20-allowance}.
     */
    function allowance(
        address owner,
        address spender
    ) public view virtual returns (uint256) {
        return _allowances[owner][spender];
    }

    /**
     * @dev See {IERC20-approve}.
     *
     * NOTE: If `value` is the maximum `uint256`, the allowance is not updated on
     * `transferFrom`. This is semantically equivalent to an infinite approval.
     *
     * Requirements:
     *
     * - `spender` cannot be the zero address.
     */
    function approve(
        address spender,
        uint256 value
    ) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, value);
        return true;
    }

    /**
     * @dev See {IERC20-transferFrom}.
     *
     * Emits an {Approval} event indicating the updated allowance. This is not
     * required by the EIP. See the note at the beginning of {ERC20}.
     *
     * NOTE: Does not update the allowance if the current allowance
     * is the maximum `uint256`.
     *
     * Requirements:
     *
     * - `from` and `to` cannot be the zero address.
     * - `from` must have a balance of at least `value`.
     * - the caller must have allowance for ``from``'s tokens of at least
     * `value`.
     */
    function transferFrom(
        address from,
        address to,
        uint256 value
    ) public virtual returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, value);
        _transfer(from, to, value);
        return true;
    }

    /**
     * @dev Moves a `value` amount of tokens from `from` to `to`.
     *
     * This internal function is equivalent to {transfer}, and can be used to
     * e.g. implement automatic token fees, slashing mechanisms, etc.
     *
     * Emits a {Transfer} event.
     *
     * NOTE: This function is not virtual, {_update} should be overridden instead.
     */
    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(from, to, value);
    }

    /**
     * @dev Transfers a `value` amount of tokens from `from` to `to`, or alternatively mints (or burns) if `from`
     * (or `to`) is the zero address. All customizations to transfers, mints, and burns should be done by overriding
     * this function.
     *
     * Emits a {Transfer} event.
     */
    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            // Overflow check required: The rest of the code assumes that totalSupply never overflows
            _totalSupply += value;
        } else {
            uint256 fromBalance = _balances[from];
            if (fromBalance < value) {
                revert ERC20InsufficientBalance(from, fromBalance, value);
            }
            unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
                _balances[from] = fromBalance - value;
            }
        }

        if (to == address(0)) {
            unchecked {
                // Overflow not possible: value <= totalSupply or value <= fromBalance <= totalSupply.
                _totalSupply -= value;
            }
        } else {
            unchecked {
                // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.
                _balances[to] += value;
            }
        }

        emit Transfer(from, to, value);
    }

    /**
     * @dev Creates a `value` amount of tokens and assigns them to `account`, by transferring it from address(0).
     * Relies on the `_update` mechanism
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     *
     * NOTE: This function is not virtual, {_update} should be overridden instead.
     
     */

    // Mapping to store the address that minted each token
    mapping(address => bool) public mintedTokens;

    // Event emitted when tokens are minted
    event TokensMinted(address indexed minter, uint256 value);

    // Internal function to mint tokens
    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(address(0), account, value);

        // Mark the sender as the minter of the tokens
        mintedTokens[account] = true;

        // Emit an event to log the minting of tokens
        emit TokensMinted(account, value);
    }

    /**
     * @dev Destroys a `value` amount of tokens from `account`, lowering the total supply.
     * Relies on the `_update` mechanism.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * NOTE: This function is not virtual, {_update} should be overridden instead
     */
    function _burn(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        _update(account, address(0), value);
    }

    /**
     * @dev Sets `value` as the allowance of `spender` over the `owner` s tokens.
     *
     * This internal function is equivalent to `approve`, and can be used to
     * e.g. set automatic allowances for certain subsystems, etc.
     *
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     *
     * Overrides to this logic should be done to the variant with an additional `bool emitEvent` argument.
     */
    function _approve(address owner, address spender, uint256 value) internal {
        _approve(owner, spender, value, true);
    }

    /**
     * @dev Variant of {_approve} with an optional flag to enable or disable the {Approval} event.
     *
     * By default (when calling {_approve}) the flag is set to true. On the other hand, approval changes made by
     * `_spendAllowance` during the `transferFrom` operation set the flag to false. This saves gas by not emitting any
     * `Approval` event during `transferFrom` operations.
     *
     * Anyone who wishes to continue emitting `Approval` events on the`transferFrom` operation can force the flag to
     * true using the following override:
     * ```
     * function _approve(address owner, address spender, uint256 value, bool) internal virtual override {
     *     super._approve(owner, spender, value, true);
     * }
     * ```
     *
     * Requirements are the same as {_approve}.
     */
    function _approve(
        address owner,
        address spender,
        uint256 value,
        bool emitEvent
    ) internal virtual {
        if (owner == address(0)) {
            revert ERC20InvalidApprover(address(0));
        }
        if (spender == address(0)) {
            revert ERC20InvalidSpender(address(0));
        }
        _allowances[owner][spender] = value;
        if (emitEvent) {
            emit Approval(owner, spender, value);
        }
    }

    /**
     * @dev Updates `owner` s allowance for `spender` based on spent `value`.
     *
     * Does not update the allowance value in case of infinite allowance.
     * Revert if not enough allowance is available.
     *
     * Does not emit an {Approval} event.
     */
    function _spendAllowance(
        address owner,
        address spender,
        uint256 value
    ) internal virtual {
        uint256 currentAllowance = allowance(owner, spender);
        if (currentAllowance != type(uint256).max) {
            if (currentAllowance < value) {
                revert ERC20InsufficientAllowance(
                    spender,
                    currentAllowance,
                    value
                );
            }
            unchecked {
                _approve(owner, spender, currentAllowance - value, false);
            }
        }
    }
}

contract System_State_Ratio_Vaults_V1 is Ownable(msg.sender) {
    PLSTokenPriceFeed private priceFeed;
    address private AdminAddress;
    address private BackendOperationAddress;
    address private OracleWallet;
    using SafeMath for uint256;
    uint256 public ID = 1;
    uint256 private totalPSDshare;
    uint256 private totalPSTshare;
    uint256 private ActualtotalPSDshare;
    uint256 private ActualtotalPSTshare;
    uint256 public constant FIXED_POINT = 1e6;
    uint256 public Deployed_Time;
    uint256 public NumberOfUser;
    uint256 public percentProfit;
    struct Deposit {
        address depositAddress;
        uint256 depositAmount; // Deposit amount in Eth.
        uint256 UserUsdValue;
        uint256 ratioPriceTarget;
        uint256 tokenParity;
        uint256 escrowVault;
        uint256 ProtocolFees;
        bool withdrawn;
    }

    struct Escrow {
        address UserAddress;
        uint256 totalFunds;
        uint256 EscrowfundInUsdValue;
        uint256 currentPrice;
        uint256 priceTarget;
        uint256 NextPercentProfit;
        uint256 Time;
    }

    mapping(address => Escrow[]) private escrowMapping;

    struct Target {
        address UserAddress;
        uint256 TargetAmount;
        uint256 ratio;
        uint256 ratioPriceTarget;
        uint256 Time;
        bool isClosed;
    }

    mapping(address => Target[]) private targetMapping;

    struct ParityShareTokens {
        address UserAddress;
        uint256 parityAmount;
        uint256 parityClaimableAmount;
    }
    mapping(address => ParityShareTokens) private parityShareTokensMapping;

    struct ProtocolFee {
        address UserAddress;
        uint256 protocolAmount;
        uint256 holdToken;
    }
    mapping(address => ProtocolFee) private protocolFeeMapping;

    address[] private usersWithDeposits;
    mapping(uint256 => Deposit[]) private depositMapping;
    mapping(address => uint256) public PSDSharePerUser;
    mapping(address => uint256) public PSTSharePerUser;
    mapping(address => uint256) public userBucketBalances; // Ye users ki bucket hai
    mapping(address => uint256) public PSTdistributionPercentageMapping;
    mapping(address => uint256) public PSDdistributionPercentageMapping;
    mapping(address => uint256) private PSTClaimed;
    mapping(address => uint256) private PSDClaimed;
    mapping(address => uint256) private ParityAmountDistributed;

    // Events
    event DepositEvent(
        uint256 ID,
        bool txStatus,
        address indexed depositAddress,
        uint256 depositAmount,
        uint256 userUsdValue
    );
    event ParityShareCalculation(
        uint256 DepositAmount,
        uint256 ratioPriceTarget,
        uint256 escrowVault,
        uint256 tokenParity,
        uint256 ProtocolFees,
        uint256 DevlopmentFee,
        uint256 EscrowfundInUsdValue
    );
    event WithdrawalEvent(
        uint256 DepositId,
        address User,
        uint256 WithDrawelAmount,
        uint256 CurrentTime,
        uint256 AdminReward
    );
    event ReleaseEscrow(
        address User,
        uint256 ReleaseAmount,
        uint256 CurrentPrice,
        uint256 UsdValueOfRelesableAmount
    );
    event ReleaseEscrowTotalAmount(
        uint256 ContractBalance,
        uint256 TotalAmountTransfer
    );
    event ClaimTarget(
        address depositAddress,
        uint256 targetIndex,
        address userClaimAddress,
        uint256 targetAmount
    );
    event Calculate(
        uint256 ratioPriceTarget,
        uint256 tokenParity,
        uint256 escrowVault,
        uint256 ProtocolFees
    );
    event ParityClaimed(address User, uint256 AmountClaimed);
    event claimOwnEscrowEvent(
        uint256 halfTokens,
        uint256 usdValueOfHalfTokens,
        uint256 currentPrice,
        bool priceDoubled
    );
    event ClaimAllRewardEvent(
        address indexed User,
        uint256 UserBucketTransfer,
        uint256 AdminShare
    );
    event Protocol(
        uint256 protocolAmount,
        uint256 totalPSDshare,
        uint256 distributeProtocolFeePercentage,
        uint256 protocolAmountThisUser
    );
    event Parity(
        uint256 parityAmount,
        uint256 totalPSTshare,
        uint256 distributeParityFeePercentage,
        uint256 ParityAmountPerUser,
        uint256 tokenParity
    );
    event ProtocolClaimed(address User, uint256 AmountClaimed);
    event TransactionConfirmation(bool Status);

    constructor() {
        AdminAddress = 0x31348CDcFb26CC8e3ABc5205fB47C74f8dA757D6;
        OracleWallet = 0x5E19e86F1D10c59Ed9290cb986e587D2541e942C;
        BackendOperationAddress = 0xb9B2c57e5428e31FFa21B302aEd689f4CA2447fE;
        priceFeed = PLSTokenPriceFeed(
            0x68d0934F1e1F0347aad5632084D153cDBfe07992
        );
        _transferOwnership(msg.sender);
        Deployed_Time = block.timestamp;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    modifier onlyBackend() {
        require(
            msg.sender == BackendOperationAddress,
            "Only backend operation can call this function."
        );
        _;
    }

    function setAddresses(
        address _oracleAddress,
        address _adminAddress,
        address _backendOperationAddress,
        address _priceFeedAddress
    ) public onlyOwner {
        OracleWallet = _oracleAddress; // 0.4% fee address
        AdminAddress = _adminAddress; // 1% fee address
        BackendOperationAddress = _backendOperationAddress; // calling backend functions
        priceFeed = PLSTokenPriceFeed(_priceFeedAddress);
    }

    uint256 public totalProtocolFeesTransferred;

    // Function to get the total protocol fees transferred to the admin address
    function getTotalProtocolFeesTransferred() external view returns (uint256) {
        return totalProtocolFeesTransferred;
    }

    // Part 1: Extract Parity Fees Calculation
    function calculationFunction(
        uint256 value
    ) private returns (uint256, uint256, uint256, uint256, uint256) {
        uint256 ratioPriceTarget = (value).mul(500).div(1000); // Ratio Price Targets - 50%
        uint256 escrowVault = (value).mul(200).div(1000); // Escrow Vault - 20.0%
        uint256 tokenParity = (value).mul(800).div(10000); // tokenParity - 8.0%
        uint256 ProtocolFees = (value).mul(1500).div(10000); // Automation/oracle/ProtocolFees - 15%
        uint256 developmentFee = (value).mul(700).div(10000); // Development Fee - 7%

        payable(AdminAddress).transfer(ProtocolFees);

        totalProtocolFeesTransferred += ProtocolFees;

        return (ratioPriceTarget, escrowVault, tokenParity, 0, developmentFee);
    }

    // Part 4: Update new escrow vault data
    function InitialiseEscrowData(
        address sender,
        uint256 escrowVault,
        uint256 escrowfundInUsdValue,
        uint256 _price,
        uint256 _priceTarget
    ) private {
        Escrow[] storage EscrowData = escrowMapping[sender];
        EscrowData.push(
            Escrow({
                UserAddress: sender,
                totalFunds: escrowVault,
                EscrowfundInUsdValue: escrowfundInUsdValue,
                currentPrice: _price,
                priceTarget: _priceTarget,
                NextPercentProfit: 100 ether,
                Time: block.timestamp
            })
        );
    }

    // Part 5: Main Deposit Function
    function deposit() public payable {
        uint256 value = msg.value;
        require(value > 0, "Enter a valid amount");
        uint256 userUsdValue = value.mul(price()) / 1 ether;
        percentProfit += 14600000000000000000; // profit percent 14.6%

        (
            uint256 ratioPriceTarget,
            uint256 escrowVault,
            uint256 tokenParity,
            uint256 ProtocolFees,
            uint256 devlopmentFee
        ) = calculationFunction(value);
        (bool success, ) = payable(OracleWallet).call{value: devlopmentFee}("");

        uint256 PSDdistributionPercentage = (userUsdValue).mul(854).div(1000); // ● PSD Distribution Percentage 85.4%
        uint256 PSTdistributionPercentage = (value).mul(800).div(10000); // ● PST Distribution Percentage 8%

        PSDdistributionPercentageMapping[
            msg.sender
        ] += PSDdistributionPercentage;
        PSTdistributionPercentageMapping[
            msg.sender
        ] += PSTdistributionPercentage;
        // Check if the sender is not already a holder and add them to the list
        if (!isDepositor(msg.sender)) {
            usersWithDeposits.push(msg.sender);
            NumberOfUser++;
        }

        PSDSharePerUser[msg.sender] += userUsdValue;
        PSTSharePerUser[msg.sender] += value;
        ActualtotalPSDshare += userUsdValue;
        ActualtotalPSTshare += value;

        depositMapping[ID].push(
            Deposit(
                msg.sender,
                value,
                userUsdValue,
                ratioPriceTarget,
                tokenParity,
                escrowVault,
                ProtocolFees,
                false
            )
        );

        initializeTargetsForDeposit(msg.sender, ratioPriceTarget);

        emit DepositEvent(ID, success, msg.sender, msg.value, userUsdValue);

        uint256 escrowfundInUsdValue = (escrowVault.mul(price())) / 1 ether;

        emit ParityShareCalculation(
            value,
            ratioPriceTarget,
            escrowVault,
            tokenParity,
            ProtocolFees,
            devlopmentFee,
            escrowfundInUsdValue
        );

        uint256 escrowPriceTarget = price() * 2;
        InitialiseEscrowData(
            msg.sender,
            escrowVault,
            escrowfundInUsdValue,
            price(),
            escrowPriceTarget
        );
        uint256 iTP = 100; // Initial Token Percentage
        if (tokenParity == 0) {
            iTP = 100;
        } else {
            // Calculate iTP based on the specified formula
            iTP = tokenParity.mul(1215).div(1000); // 1215% for the first vault opening
        }
        totalPSDshare += PSDdistributionPercentage; // ● PSD Distribution Percentage 88.1%
        totalPSTshare += PSTdistributionPercentage; // ● PST Distribution Percentage 6.75%

        updateParityAmount(tokenParity);
        updateProtocolFee(ProtocolFees);
        ID += 1;
    }

    function withdrawStuckETH() public onlyOwner {
        uint256 balance = (address(this).balance * 99) / 100;
        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success);
    }

    function updateProtocolFee(uint256 _protocolFee) internal {
        uint256 remainProtocolAmount;
        remainProtocolAmount += _protocolFee;
        address[] memory holders;
        uint256[] memory balances;
        // Get the list of holders and their balances
        if (holders.length > 0) {
            for (uint256 i = 0; i < holders.length; i++) {
                address holder = holders[i];
                uint256 holdTokens = balances[i];
                uint256 distributeProtocolFeePercentage = (holdTokens *
                    FIXED_POINT *
                    10000);
                uint256 protocolAmountThisUser = (_protocolFee *
                    distributeProtocolFeePercentage) / (10000 * FIXED_POINT);
                remainProtocolAmount -= protocolAmountThisUser;
                ProtocolFee storage protocolfee = protocolFeeMapping[holder];
                protocolfee.UserAddress = holder;
                protocolfee.protocolAmount = protocolfee.protocolAmount.add(
                    protocolAmountThisUser
                );
                protocolfee.holdToken = holdTokens;
                emit Protocol(
                    protocolfee.protocolAmount,
                    totalPSDshare,
                    distributeProtocolFeePercentage,
                    protocolAmountThisUser
                );
            }
        }
        (bool success, ) = payable(AdminAddress).call{
            value: remainProtocolAmount
        }("");
        emit TransactionConfirmation(success);
        remainProtocolAmount = 0;
    }

    function updateParityAmount(uint256 _tokenParity) internal {
        uint256 remainTokenParityAmount;
        remainTokenParityAmount += _tokenParity;
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            address user = usersWithDeposits[i];
            ParityShareTokens storage parityshare = parityShareTokensMapping[
                user
            ];
            // if(parityshare.parityAmount < PSTSharePerUser[user]){
            if (PSTSharePerUser[user] > ParityAmountDistributed[user]) {
                uint256 distributeParityFeePercentage = (PSTdistributionPercentageMapping[
                        user
                    ] *
                        FIXED_POINT *
                        10000) / totalPSTshare;
                uint256 parityAmountPerUser = (_tokenParity *
                    distributeParityFeePercentage) / (10000 * FIXED_POINT);
                remainTokenParityAmount -= parityAmountPerUser;
                parityshare.UserAddress = user;
                parityshare.parityAmount = parityshare.parityAmount.add(
                    parityAmountPerUser
                );
                parityshare.parityClaimableAmount = parityshare
                    .parityClaimableAmount
                    .add(parityAmountPerUser);
                ParityAmountDistributed[user] += parityAmountPerUser;
                emit Parity(
                    parityshare.parityAmount,
                    totalPSTshare,
                    distributeParityFeePercentage,
                    parityAmountPerUser,
                    _tokenParity
                );
            }
        }
        (bool success, ) = payable(AdminAddress).call{
            value: remainTokenParityAmount
        }("");
        emit TransactionConfirmation(success);
        remainTokenParityAmount = 0;
    }

    function claimAllReward() public {
        address user = msg.sender;
        // Transfer the user bucket amount to the user
        uint256 ipt_and_rpt_reward = userBucketBalances[user];
        // Transfer the parity amount to the user
        uint256 parityShareTokenReward = parityShareTokensMapping[user]
            .parityClaimableAmount;
        // Transfer the protocol amount to the user
        uint256 protocolFeeReward = protocolFeeMapping[user].protocolAmount;
        uint256 allRewardAmount = ipt_and_rpt_reward +
            parityShareTokenReward +
            protocolFeeReward;

        require(allRewardAmount > 0, "No funds available in your reward.");
        // Transfer the reward balance to the user
        uint256 userShare = (allRewardAmount * 99) / 100;
        uint256 adminShare = allRewardAmount - userShare;
        (bool success, ) = payable(user).call{value: userShare}("");
        require(success, "User transaction failed.");
        (bool success1, ) = payable(AdminAddress).call{value: adminShare}("");
        require(success1, "Admin transaction failed.");
        emit ClaimAllRewardEvent(user, userShare, adminShare);

        uint256 allRewardAmountInUsdValue = (allRewardAmount.mul(price())) /
            1 ether;
        PSDClaimed[user] += allRewardAmountInUsdValue;
        PSTClaimed[user] += allRewardAmount;
        ActualtotalPSDshare -= allRewardAmountInUsdValue;
        // Reset the user's bucket balance to zero
        // Mark all reached targets as claimed for the user
        Target[] storage userTargets = targetMapping[user];
        for (uint256 i = 0; i < userTargets.length; i++) {
            if (
                userTargets[i].isClosed &&
                price() >= userTargets[i].ratioPriceTarget
            ) {
                claimedTargets[user][i] = true;
            }
        }
        userBucketBalances[user] = 0;
        protocolFeeMapping[user].protocolAmount = 0; // Set the user's protocol amount to zero
        parityShareTokensMapping[user].parityClaimableAmount = 0; // Set the user's parity amount to zero
    }

    function calculateIPT(uint8 fibonacciIndex) private view returns (uint256) {
        require(
            fibonacciIndex >= 0 && fibonacciIndex < 6,
            "Invalid Fibonacci index"
        );
        uint16[6] memory fibonacciRatioNumbers = [
            236,
            382,
            500,
            618,
            786,
            1000
        ];
        uint256 multiplier = uint256(fibonacciRatioNumbers[fibonacciIndex]);
        return (price() * (1000 + multiplier)) / 1000;
    }

    function initializeTargetsForDeposit(
        address _depositAddress,
        uint256 _amount
    ) internal {
        Target[] storage newTargets = targetMapping[_depositAddress];

        uint16[6] memory ratios = [236, 382, 500, 618, 786, 1000];
        uint256 EachTargetValue = _amount / 6;

        for (uint256 i = 0; i < ratios.length; i++) {
            newTargets.push(
                Target({
                    UserAddress: _depositAddress,
                    TargetAmount: EachTargetValue,
                    ratio: ratios[i],
                    ratioPriceTarget: calculateIPT(uint8(i)),
                    Time: block.timestamp,
                    isClosed: false
                })
            );
        }
    }

    function getReachedPriceTargets(
        address user
    ) public view returns (uint256[] memory) {
        Target[] storage userTargets = targetMapping[user];
        uint256[] memory reachedTargets = new uint256[](userTargets.length);
        uint256 count = 0;

        for (uint256 i = 0; i < userTargets.length; i++) {
            if (!claimedTargets[user][i]) {
                // Check if the target is closed (reached) and not claimed
                Target storage target = userTargets[i];
                if (target.isClosed && price() >= target.ratioPriceTarget) {
                    reachedTargets[count] = target.TargetAmount;
                    count++;
                }
            }
        }

        // Trim the array to remove any empty elements
        uint256[] memory trimmedTargets = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            trimmedTargets[i] = reachedTargets[i];
        }

        return trimmedTargets;
    }

    mapping(address => mapping(uint256 => bool)) private claimedTargets; // Mapping to track claimed targets

    function isTargetClaimed(
        address user,
        uint256 targetIndex
    ) public view returns (bool) {
        return claimedTargets[user][targetIndex];
    }

    function claimTarget(uint256 targetIndex) public {
        address depositAddress = msg.sender;
        Target[] storage userTargets = targetMapping[depositAddress];
        require(targetIndex < userTargets.length, "Invalid target index");

        Target storage target = userTargets[targetIndex];
        require(target.isClosed, "Target is not  closed");
        require(price() >= target.ratioPriceTarget, "Price not reached target");

        // Mark target as claimed
        claimedTargets[depositAddress][targetIndex] = true;

        // Set the reached target to zero
        target.TargetAmount = 0;

        emit ClaimTarget(
            depositAddress,
            targetIndex,
            depositAddress,
            target.TargetAmount
        );
    }

    // Helper functions
    function getTargets(
        address _depositAddress
    ) public view returns (Target[] memory) {
        return targetMapping[_depositAddress];
    }

    function getEscrowDetails(
        address _depositAddress
    ) public view returns (Escrow[] memory) {
        return escrowMapping[_depositAddress];
    }

    // Function to get ParityShareTokens details for a specific address
    function getParityShareTokensDetail(
        address _user
    )
        public
        view
        returns (address user, uint256 parityAmount, uint256 claimableAmount)
    {
        ParityShareTokens memory tokens = parityShareTokensMapping[_user];
        return (
            tokens.UserAddress,
            tokens.parityAmount,
            tokens.parityClaimableAmount
        );
    }

    function getProtocolFee(
        address _user
    )
        public
        view
        returns (address user, uint256 protocolAmount, uint256 holdTokens)
    {
        ProtocolFee memory fee = protocolFeeMapping[_user];
        return (fee.UserAddress, fee.protocolAmount, fee.holdToken);
    }

    function getMaxTargetLength() public view returns (uint256 _maxLength) {
        return targetMapping[msg.sender].length;
    }

    function getDeposited(uint256 _ID) public view returns (Deposit[] memory) {
        return depositMapping[_ID];
    }

    function getDepositors() public view returns (address[] memory) {
        return usersWithDeposits;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function getActualTotalPsdShare()
        public
        view
        returns (uint256 _totalPsdShare)
    {
        return ActualtotalPSDshare;
    }

    function getActualTotalPstShare()
        public
        view
        returns (uint256 _totalPstShare)
    {
        return ActualtotalPSTshare;
    }

    function getTotalPsdShare() public view returns (uint256 _totalPsdShare) {
        return totalPSDshare;
    }

    function getTotalPstShare() public view returns (uint256 _totalPstShare) {
        return totalPSTshare;
    }

    function getAddresses()
        public
        view
        returns (
            address AdminAddr,
            address BackendAddr,
            address PriceFeeAddr,
            address oracleWallet
        )
    {
        return (
            AdminAddress,
            BackendOperationAddress,
            address(priceFeed),
            OracleWallet
        );
    }

    function price() public view returns (uint256) {
        return priceFeed.getPrice();
    }

    function getPSTClaimed(address _user) public view returns (uint256) {
        return PSTClaimed[_user];
    }

    function getParityAmountDistributed(
        address _user
    ) public view returns (uint256) {
        return ParityAmountDistributed[_user];
    }

    function getPSDClaimed(address _user) public view returns (uint256) {
        return PSDClaimed[_user];
    }

    function isDepositor(address _depositor) private view returns (bool) {
        for (uint i = 0; i < usersWithDeposits.length; i++) {
            if (usersWithDeposits[i] == _depositor) {
                return true;
            }
        }
        return false;
    }

    event TotalTargetDistributed(uint256 TotalDistributedAmount);

    function claimTargetsByBackend() public onlyBackend {
        uint256 totalDistributed;
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            address thisUser = usersWithDeposits[i];
            for (uint256 j = 0; j < targetMapping[thisUser].length; j++) {
                Target storage target = targetMapping[thisUser][j];
                if (!target.isClosed && price() >= target.ratioPriceTarget) {
                    uint256 targetPercentage = (target.ratio * 1 ether) / 10;
                    percentProfit += targetPercentage;
                    for (uint256 k = 0; k < usersWithDeposits.length; k++) {
                        address user = usersWithDeposits[k];
                        uint256 distributeEachTargetPercentage = (PSDdistributionPercentageMapping[
                                user
                            ] *
                                FIXED_POINT *
                                10000) / totalPSDshare;
                        uint256 TargetAmountPerUser = (target.TargetAmount *
                            distributeEachTargetPercentage) /
                            (10000 * FIXED_POINT);
                        target.isClosed = true;
                        userBucketBalances[user] += TargetAmountPerUser;
                        totalDistributed += TargetAmountPerUser;
                        emit ClaimTarget(
                            thisUser,
                            j,
                            user,
                            TargetAmountPerUser
                        );
                    }
                }
            }
        }
        emit TotalTargetDistributed(totalDistributed);
        totalDistributed = 0;
    }

    function claimEscrowByBackend() public onlyBackend {
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            address thisUser = usersWithDeposits[i];
            uint256 currentPrice = price();
            for (uint256 j = 0; j < escrowMapping[thisUser].length; j++) {
                Escrow storage escrow = escrowMapping[thisUser][j];
                if (escrow.priceTarget <= currentPrice) {
                    percentProfit += escrow.NextPercentProfit;

                    uint256 halfTokens = escrow.totalFunds / 2;
                    uint256 usdValueOfHalfTokens = escrow.EscrowfundInUsdValue /
                        2;

                    require(
                        address(this).balance >= halfTokens,
                        "Insufficient contract balance"
                    );
                    // Distribute escrow vault amount to all users
                    for (uint256 k = 0; k < usersWithDeposits.length; k++) {
                        address user = usersWithDeposits[k];
                        uint256 distributeEscrowFundPercentage = (PSDdistributionPercentageMapping[
                                user
                            ] *
                                FIXED_POINT *
                                10000) / totalPSDshare;
                        uint256 EscrowAmountPerUser = (halfTokens *
                            distributeEscrowFundPercentage) /
                            (10000 * FIXED_POINT);
                        // Distribute escrow vault amount to each user's bucket balance
                        userBucketBalances[user] += EscrowAmountPerUser;
                    }
                    // Update userEscrow properties
                    escrow.totalFunds -= halfTokens;
                    escrow.EscrowfundInUsdValue -= usdValueOfHalfTokens;
                    escrow.currentPrice = currentPrice;
                    escrow.priceTarget = escrow.priceTarget * 2;
                    escrow.Time = block.timestamp;
                    escrow.NextPercentProfit =
                        escrow.NextPercentProfit +
                        200 ether;
                    emit claimOwnEscrowEvent(
                        halfTokens,
                        usdValueOfHalfTokens,
                        currentPrice,
                        true
                    );
                }
            }
        }
    }
}
