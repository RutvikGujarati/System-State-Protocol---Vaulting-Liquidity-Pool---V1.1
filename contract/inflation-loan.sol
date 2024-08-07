// SPDX-License-Identifier: SEE LICENSE IN LICENSE

// File: PLSTokenPriceFeed.sol

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PLSTokenPriceFeed {
    uint256 private priceInUSD;

    /*
    this BackendOperationAddress address is the main authority address. it is handle to change PLS price and used in other two functions of System_State_Ratio_Vaults-V1 contract these functions are there we want to claim tokens from there with this acocunt address: "claimTargetsByBackend" , "claimEscrowByBackend". 
    */
    address private BackendOperationAddress;

    //0xb424DA92b1C2b13A877269124b84EAC4e84fA228
    // in .env file there is private key of this account address to change price of PLS token.
    // PriceFeed contract is only used for testnet

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

// File: @openzeppelin/contracts/utils/Context.sol

// OpenZeppelin Contracts (last updated v5.0.1) (utils/Context.sol)

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

// File: @openzeppelin/contracts/access/Ownable.sol

// OpenZeppelin Contracts (last updated v5.0.0) (access/Ownable.sol)

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

interface IPDXN {
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}

contract DAVTOKEN is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 422000 * 10 ** 18;
    uint256 public constant MAX_PDXN_SUPPLY = 80000 * 10 ** 18;
    uint256 public pdxnMinted = 0;

    mapping(address => bool) public isHolder;
    address[] public holders;

    uint256 public PRICE_TWO_TOKEN = 500000 ether;
    uint256 public PRICE_FIVE_TOKENS = 1000000 ether;
    uint256 public PRICE_THIRTEEN_TOKENS = 2000000 ether;

    uint256 public PDXN_PRICE_TWO_TOKEN = 800 * 10 ** 18;
    uint256 public PDXN_PRICE_FIVE_TOKENS = 1750 * 10 ** 18;
    uint256 public PDXN_PRICE_THIRTEEN_TOKENS = 2500 * 10 ** 18;

    address public PDXN_TOKEN_ADDRESS;
    address payable public paymentAddress;

    event TokensBought(address indexed buyer, uint256 quantity, uint256 cost);
    event TokensMintedWithPDXN(
        address indexed minter,
        uint256 quantity,
        uint256 cost
    );
    event HolderAdded(address indexed holder);
    event PricesSet(
        uint256 priceTwoTokens,
        uint256 priceFiveTokens,
        uint256 priceThirteenTokens
    );
    event PDXNPricesSet(
        uint256 priceTwoTokens,
        uint256 priceFiveTokens,
        uint256 priceThirteenTokens
    );

    constructor(
        address _PDXN_TOKEN_ADDRESS,
        address payable _paymentAddress
    ) ERC20("DAVPLS", "DAVPLS") Ownable(msg.sender) {
        PDXN_TOKEN_ADDRESS = _PDXN_TOKEN_ADDRESS;
        paymentAddress = _paymentAddress;
    }

    function mint(address to, uint256 amount) public onlyOwner {
        require(
            totalSupply() + amount <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );
        _mint(to, amount);
        _addHolder(to);
    }

    function buyTokens(uint256 quantity) public payable {
        uint256 cost;
        if (quantity == 2) {
            cost = PRICE_TWO_TOKEN;
        } else if (quantity == 5) {
            cost = PRICE_FIVE_TOKENS;
        } else if (quantity == 13) {
            cost = PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        require(msg.value == cost, "Incorrect Ether amount sent");
        require(
            totalSupply() + (quantity * 10 ** 18) <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        _mint(msg.sender, quantity * 10 ** 18);
        _addHolder(msg.sender);

        // Transfer the received Ether to the payment address
        (bool success, ) = paymentAddress.call{value: msg.value}("");
        require(success, "Ether transfer failed");

        emit TokensBought(msg.sender, quantity, cost);
    }

    function mintWithPDXN(uint256 quantity) public {
        uint256 cost;
        if (quantity == 2) {
            cost = PDXN_PRICE_TWO_TOKEN;
        } else if (quantity == 5) {
            cost = PDXN_PRICE_FIVE_TOKENS;
        } else if (quantity == 13) {
            cost = PDXN_PRICE_THIRTEEN_TOKENS;
        } else {
            revert("Invalid token quantity");
        }

        uint256 amountToMint = quantity * 10 ** 18;
        require(
            pdxnMinted + amountToMint <= MAX_PDXN_SUPPLY,
            "Exceeds pDXN minting limit"
        );
        require(
            totalSupply() + amountToMint <= MAX_SUPPLY,
            "Exceeds maximum token supply"
        );

        IPDXN pdxnToken = IPDXN(PDXN_TOKEN_ADDRESS);
        require(
            pdxnToken.transferFrom(msg.sender, paymentAddress, cost),
            "pDXN transfer failed"
        );

        _mint(msg.sender, amountToMint);
        pdxnMinted += amountToMint;
        _addHolder(msg.sender);

        emit TokensMintedWithPDXN(msg.sender, quantity, cost);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function _addHolder(address holder) internal {
        if (!isHolder[holder]) {
            isHolder[holder] = true;
            holders.push(holder);
            emit HolderAdded(holder);
        }
    }

    function holdersLength() external view returns (uint256) {
        return holders.length;
    }

    function holderAt(uint256 index) external view returns (address) {
        require(index < holders.length, "Index out of bounds");
        return holders[index];
    }

    function setPriceOfTokens(
        uint256 twoT,
        uint256 fiveT,
        uint256 thirteenT
    ) public onlyOwner {
        PRICE_TWO_TOKEN = twoT;
        PRICE_FIVE_TOKENS = fiveT;
        PRICE_THIRTEEN_TOKENS = thirteenT;
        emit PricesSet(twoT, fiveT, thirteenT);
    }

    function setPDXNPriceOfTokens(
        uint256 twoT,
        uint256 fiveT,
        uint256 thirteenT
    ) public onlyOwner {
        PDXN_PRICE_TWO_TOKEN = twoT;
        PDXN_PRICE_FIVE_TOKENS = fiveT;
        PDXN_PRICE_THIRTEEN_TOKENS = thirteenT;
        emit PDXNPricesSet(twoT, fiveT, thirteenT);
    }
}
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract System_State_Ratio_Vaults_V1 is Ownable(msg.sender) {
    PLSTokenPriceFeed private priceFeed;
    IERC20 public xenToken;
    address private AdminAddress;
    address public DAVPLSAddress;
    DAVTOKEN public DAVPLS;
    address private BackendOperationAddress;
    using SafeMath for uint256;
    uint256 public ID = 1;
    uint256 public IS = 1;
    uint256 private totalPSDshare;
    uint256 private totalPSTshare;
    uint256 private ActualtotalPSDshare;
    uint256 private ActualtotalPSTshare;
    uint256 public constant FIXED_POINT = 1e6;
    uint256 public Deployed_Time;
    uint256 public NumberOfUser;
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
    mapping(address => uint256) public userBucketBalances;
    mapping(address => uint256) public PSTdistributionPercentageMapping;
    mapping(address => uint256) public PSDdistributionPercentageMapping;
    mapping(address => uint256) private PSTClaimed;
    mapping(address => uint256) private PSDClaimed;
    mapping(address => uint256) private ParityAmountDistributed;

    // Events
    event DepositEvent(
        uint256 ID,
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
        uint256 AutoVaultFee,
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
        BackendOperationAddress = 0xb9B2c57e5428e31FFa21B302aEd689f4CA2447fE;
        DAVPLS = DAVTOKEN(0x1Ac3a3d8A8F1fEd7DbaeD4B79bd58e3B0B6D0bF5);
        priceFeed = PLSTokenPriceFeed(
            0xDe5d82bD18Bdc2B0C1ec1997EE375848a21546f8
        );
        xenToken = IERC20(0xbe4F7C4DF748cE32A5f4aADE815Bd7743fB0ea51);
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

    function changeOwner(address owner) public onlyOwner {
        _transferOwnership(owner);
    }

    function setAddresses(
        address _adminAddress,
        address _backendOperationAddress,
        address _priceFeedAddress
    ) public onlyOwner {
        AdminAddress = _adminAddress; // 10% fee address
        BackendOperationAddress = _backendOperationAddress; // calling backend functions
        priceFeed = PLSTokenPriceFeed(_priceFeedAddress);
    }

    function setPriceFeedAddress(address _priceFeedAddress) public onlyOwner {
        priceFeed = PLSTokenPriceFeed(_priceFeedAddress);
    }

    uint256 public totalProtocolFeesTransferred;

    // Function to get the total protocol fees transferred to the admin address
    function getTotalProtocolFeesTransferred() external view returns (uint256) {
        return totalProtocolFeesTransferred;
    }

    mapping(address => uint256) public userAutoVault;
    event AutoVaultThresholdReached(address user, uint256 value);

    // Part 1: Extract Parity Fees Calculation
    function calculationFunction(
        uint256 value
    ) private returns (uint256, uint256, uint256, uint256, uint256) {
        uint256 ratioPriceTarget = (value).mul(380).div(1000); // Ratio Price Target (rPT) - 38%
        uint256 escrowVault = (value).mul(380).div(1000); // Escrow Vault - 38.0%
        uint256 tokenParity = (value).mul(700).div(10000); // tokenParity - 7.0%
        uint256 ProtocolFees = (value).mul(700).div(10000); // Protocol Fees - 7%
        uint256 AutoVaultFee = (value).mul(100).div(1000); // AutoVault Fee - 10%

        // payable(AdminAddress).transfer(ProtocolFees);
        // xenToken.approve(address(this), AutoVaultFee);
        // require(
        //     xenToken.transfer(AdminAddress, ProtocolFees),
        //     "Transfer of ProtocolFees failed"
        // );

        totalProtocolFeesTransferred += ProtocolFees;
        distributeAutoVaultFee(AutoVaultFee);
        // AutoVaultFee = 0;
        return (ratioPriceTarget, escrowVault, tokenParity, 0, AutoVaultFee);
    }

    function distributeAutoVaultFee(uint256 AutoVaultFee) private {
        for (uint256 i = 0; i < DAVPLS.holdersLength(); i++) {
            address user = DAVPLS.holders(i);
            uint256 userBalance = DAVPLS.balanceOf(user);

            if (userBalance > 0 && DAVPLS.totalSupply() > 0) {
                uint256 userShare = AutoVaultFee.mul(userBalance).div(
                    DAVPLS.totalSupply()
                );
                userAutoVault[user] = userAutoVault[user].add(userShare);
            }
        }
    }

    function depositAndAutoVaults() public {
        // Check if the Auto-Vault amount is greater than zero
        uint256 autoVaultAmount = userAutoVault[msg.sender];
        require(autoVaultAmount > 0, "Enter a valid Auto-Vault amount");

        // Calculate the user's USD value based on the Auto-Vault amount
        uint256 userUsdValue = autoVaultAmount.mul(price()) / 1 ether;

        // Update Auto-Vault balance for the user
        userAutoVault[msg.sender] = userAutoVault[msg.sender].add(
            autoVaultAmount
        );

        // Initialize targets for the user
        (
            uint256 ratioPriceTarget,
            uint256 escrowVault,
            uint256 tokenParity,
            uint256 protocolFee, // uint256 autoVaultFee

        ) = calculationFunction(autoVaultAmount);

        uint256 PSDdistributionPercentage = (userUsdValue).mul(854).div(1000); // ● PSD Distribution Percentage 85.4%
        uint256 PSTdistributionPercentage = (autoVaultAmount).mul(700).div(
            10000
        ); // ● PST Distribution Percentage 7%
        PSDdistributionPercentageMapping[
            msg.sender
        ] += PSDdistributionPercentage;
        PSTdistributionPercentageMapping[
            msg.sender
        ] += PSTdistributionPercentage;
        initializeTargetsForDeposit(msg.sender, ratioPriceTarget);

        // Initialize iPT targets (Escrow Vault)
        uint256 escrowfundInUsdValue = (escrowVault.mul(price())) / 1 ether;
        uint256 escrowPriceTarget = price() * 2;
        InitialiseEscrowData(
            msg.sender,
            escrowVault,
            escrowfundInUsdValue,
            price(),
            escrowPriceTarget
        );

        // Update PSD and PST share per user
        PSDSharePerUser[msg.sender] += userUsdValue;

        totalPSDshare += PSDdistributionPercentage; // ● PSD Distribution Percentage 85.4%
        totalPSTshare += PSTdistributionPercentage; // ● PST Distribution Percentage 7%

        // Update total PSD and PST share
        ActualtotalPSDshare += userUsdValue;

        updateProtocolFee(protocolFee);
        updateParityAmount(tokenParity);

        // Emit a deposit event
        emit DepositEvent(IS, msg.sender, autoVaultAmount, userUsdValue);

        userAutoVault[msg.sender] = 0;

        // Increment ID
        IS += 1;
    }

    function getAutovaults(address user) public view returns (uint256) {
        return userAutoVault[user];
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
                Time: block.timestamp
            })
        );
    }

    // Part 5: Main Deposit Function
    function deposit(uint256 tokenAmount) public {
        require(tokenAmount > 0, "Enter a valid amount");

        // Transfer the tokens from the sender to the contract
        require(
            xenToken.transferFrom(msg.sender, address(this), tokenAmount),
            "Token transfer failed"
        );

        uint256 userUsdValue = tokenAmount.mul(price()) / 1 ether;
        (
            uint256 ratioPriceTarget,
            uint256 escrowVault,
            uint256 tokenParity,
            uint256 ProtocolFees,
            uint256 AutoVaultFee
        ) = calculationFunction(tokenAmount);

        uint256 PSDdistributionPercentage = userUsdValue.mul(854).div(1000); // PSD Distribution Percentage 85.4%
        uint256 PSTdistributionPercentage = tokenAmount.mul(700).div(10000); // PST Distribution Percentage 7%

        PSDdistributionPercentageMapping[
            msg.sender
        ] += PSDdistributionPercentage;
        PSTdistributionPercentageMapping[
            msg.sender
        ] += PSTdistributionPercentage;

        if (!isDepositor(msg.sender)) {
            usersWithDeposits.push(msg.sender);
            NumberOfUser++;
        }

        PSDSharePerUser[msg.sender] += userUsdValue;
        PSTSharePerUser[msg.sender] += tokenAmount;
        ActualtotalPSDshare += userUsdValue;
        ActualtotalPSTshare += tokenAmount;

        depositMapping[ID].push(
            Deposit(
                msg.sender,
                tokenAmount,
                userUsdValue,
                ratioPriceTarget,
                tokenParity,
                escrowVault,
                ProtocolFees,
                false
            )
        );

        initializeTargetsForDeposit(msg.sender, ratioPriceTarget);

        emit DepositEvent(ID, msg.sender, tokenAmount, userUsdValue);

        uint256 escrowfundInUsdValue = escrowVault.mul(price()) / 1 ether;

        emit ParityShareCalculation(
            tokenAmount,
            ratioPriceTarget,
            escrowVault,
            tokenParity,
            ProtocolFees,
            AutoVaultFee,
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
            iTP = tokenParity.mul(1215).div(1000); // 1215% for the first vault opening
        }
        totalPSDshare += PSDdistributionPercentage; // PSD Distribution Percentage 88.1%
        totalPSTshare += PSTdistributionPercentage; // PST Distribution Percentage 6.75%

        updateParityAmount(tokenParity);
        updateProtocolFee(ProtocolFees);
        ID += 1;
    }

    function updateProtocolFee(uint256 _protocolFee) internal {
        uint256 remainProtocolAmount;
        remainProtocolAmount += _protocolFee;

        // Assuming holders and balances are predefined arrays in your contract
        // Ensure these arrays are populated with relevant data before calling this function

        address[] memory holders;
        uint256[] memory balances;

        // Initialize or populate holders and balances arrays appropriately

        if (holders.length > 0) {
            for (uint256 i = 0; i < holders.length; i++) {
                address holder = holders[i];
                uint256 holdTokens = balances[i];

                // Ensure FIXED_POINT is defined and appropriate for your calculations
                uint256 distributeProtocolFeePercentage = (holdTokens *
                    FIXED_POINT *
                    10000) / 100000;
                uint256 protocolAmountThisUser = (_protocolFee *
                    distributeProtocolFeePercentage) / (10000 * FIXED_POINT);

                remainProtocolAmount -= protocolAmountThisUser;

                // Assuming protocolFeeMapping is a mapping in your contract
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

        // Ensure AdminAddress is correctly defined and operational
        xenToken.approve(address(this), remainProtocolAmount);

        require(
            xenToken.transfer(AdminAddress, remainProtocolAmount),
            "transfer failed"
        );

        remainProtocolAmount = 0;
    }

    function updateParityAmount(uint256 _tokenParity) internal {
        // Initialize the remaining token parity amount to the given _tokenParity
        uint256 remainTokenParityAmount = _tokenParity;

        // Loop through all users with deposits
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            address user = usersWithDeposits[i];
            // Access the parity share information of the user
            ParityShareTokens storage parityshare = parityShareTokensMapping[
                user
            ];

            // Check if the user has more PST shares than the distributed parity amount
            if (PSTSharePerUser[user] > ParityAmountDistributed[user]) {
                // Calculate the distribution percentage of parity fees for the user
                uint256 distributeParityFeePercentage = (PSTdistributionPercentageMapping[
                        user
                    ] *
                        FIXED_POINT *
                        10000) / totalPSTshare;

                // Calculate the amount of parity tokens to distribute to the user
                uint256 parityAmountPerUser = (_tokenParity *
                    distributeParityFeePercentage) / (10000 * FIXED_POINT);

                // Subtract the distributed amount from the remaining parity amount
                remainTokenParityAmount -= parityAmountPerUser;

                // Update the parity share information for the user
                parityshare.UserAddress = user;
                parityshare.parityAmount = parityshare.parityAmount.add(
                    parityAmountPerUser
                );
                parityshare.parityClaimableAmount = parityshare
                    .parityClaimableAmount
                    .add(parityAmountPerUser);
                ParityAmountDistributed[user] += parityAmountPerUser;

                // Emit an event to log the parity distribution details
                emit Parity(
                    parityshare.parityAmount,
                    totalPSTshare,
                    distributeParityFeePercentage,
                    parityAmountPerUser,
                    _tokenParity
                );
            }
        }

        // Transfer the remaining parity amount to the AdminAddress
        // (bool success, ) = payable(AdminAddress).call{
        //     value: remainTokenParityAmount
        // }("");
        xenToken.approve(address(this), remainTokenParityAmount);
        require(
            xenToken.transfer(AdminAddress, remainTokenParityAmount),
            "transfer failed"
        );
        // Emit an event to confirm the transaction status
        // emit TransactionConfirmation(success);

        // Reset the remaining token parity amount to zero
        remainTokenParityAmount = 0;
    }

    function isParityReachedOrExceeded(
        address user
    ) public view returns (bool) {
        if (PSTClaimed[user] == 0 && PSTSharePerUser[user] == 0) {
            return false;
        }
        return PSTClaimed[user] >= PSTSharePerUser[user];
    }

    mapping(address => uint256) public userDistribution;

    function claimAllReward() public {
        address user = msg.sender;

        // Transfer the user bucket amount to the user
        uint256 ipt_and_rpt_reward = userBucketBalances[user];

        // Transfer the parity amount to the user
        uint256 parityShareTokenReward = 0;
        if (!isParityReachedOrExceeded(user)) {
            parityShareTokenReward = parityShareTokensMapping[user]
                .parityClaimableAmount;
        }

        // Calculate total reached target amount and distribution amount
        uint256 totalReachedTargetAmount = calculateTotalReachedTargetAmount(
            user
        );

        userDistribution[user] += totalReachedTargetAmount;

        // Transfer the protocol amount to the user
        uint256 protocolFeeReward = protocolFeeMapping[user].protocolAmount;
        uint256 allRewardAmount = ipt_and_rpt_reward
            .add(parityShareTokenReward)
            .add(totalReachedTargetAmount)
            .add(protocolFeeReward);

        require(allRewardAmount > 0, "No funds available in your reward.");

        // Transfer the reward balance to the user
        uint256 userShare = allRewardAmount.mul(99).div(100);
        uint256 adminShare = 0; // For all claim it is set as 0 for now.

        // (bool success, ) = payable(user).call{value: userShare}("");
        xenToken.approve(address(this), userShare);

        require(xenToken.transfer(user, userShare), "User transaction failed.");

        // (bool success1, ) = payable(AdminAddress).call{value: adminShare}("");
        xenToken.approve(address(this), adminShare);
        require(
            xenToken.transfer(AdminAddress, adminShare),
            "Admin transaction failed."
        );

        emit ClaimAllRewardEvent(user, userShare, adminShare);

        // Update PSDClaimed and PSTClaimed outside the loop
        uint256 allRewardAmountInUsdValue = allRewardAmount.mul(price()).div(
            1 ether
        );
        PSDClaimed[user] = PSDClaimed[user].add(allRewardAmountInUsdValue);
        PSTClaimed[user] = PSTClaimed[user].add(allRewardAmount);

        Target[] storage userTargets = targetMapping[user];

        for (uint256 i = 0; i < userTargets.length; i++) {
            if (
                userTargets[i].isClosed &&
                price() >= userTargets[i].ratioPriceTarget &&
                !claimedTargets[user][i]
            ) {
                claimedTargets[user][i] = true; // Mark as claimed when distributed
            }
        }

        // Reset the user's balances to zero
        userBucketBalances[user] = 0;
        protocolFeeMapping[user].protocolAmount = 0;
        parityShareTokensMapping[user].parityClaimableAmount = 0;
    }

    // Helper functions to break down complex operations
    function calculateTotalReachedTargetAmount(
        address user
    ) internal view returns (uint256) {
        Target[] storage userTargets = targetMapping[user];

        uint256 totalReachedTargetAmount = 0;

        for (uint256 i = 0; i < userTargets.length; i++) {
            if (
                userTargets[i].isClosed &&
                price() >= userTargets[i].ratioPriceTarget &&
                !claimedTargets[user][i]
            ) {
                totalReachedTargetAmount = totalReachedTargetAmount.add(
                    userTargets[i].TargetAmount
                );
            }
        }
        uint256 distributionAmount = totalReachedTargetAmount
            .mul(PSTSharePerUser[user])
            .div(ActualtotalPSTshare);

        return distributionAmount;
    }

    function buyDAVPLS(uint256 quantity) public payable {
        require(
            userAutoVault[msg.sender] > 0,
            "You must have an Auto-Vault to buy State Tokens"
        );

        // Call the buyTokens function of the DAVPLS contract
        DAVPLS.buyTokens{value: msg.value}(quantity);
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

    function getUserReceivedTokens(address user) public view returns (uint256) {
        return userBucketBalances[user];
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

    struct UserTargetDistribution {
        address user;
        uint256 distributedAmount;
    }

    mapping(address => mapping(uint256 => bool)) private claimedTargets; // Mapping to track claimed targets

    function isTargetClaimed(
        address user,
        uint256 targetIndex
    ) public view returns (bool) {
        return claimedTargets[user][targetIndex];
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
        returns (address AdminAddr, address BackendAddr, address PriceFeeAddr)
    {
        return (AdminAddress, BackendOperationAddress, address(priceFeed));
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

    // View function to get the distributed tokens for a specific user
    function getUserDistributedTokens(
        address user
    ) public view returns (uint256) {
        return userDistribution[user];
    }

    event TotalTargetDistributed(uint256 TotalDistributedAmount);

    function claimEscrowByBackend() public onlyBackend {
        for (uint256 i = 0; i < usersWithDeposits.length; i++) {
            address thisUser = usersWithDeposits[i];
            uint256 currentPrice = price();
            for (uint256 j = 0; j < escrowMapping[thisUser].length; j++) {
                Escrow storage escrow = escrowMapping[thisUser][j];
                if (escrow.priceTarget <= currentPrice) {
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
