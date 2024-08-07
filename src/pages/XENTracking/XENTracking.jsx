import React, {
  createContext,
  // useCallback,
  useContext,
  // useRef,
  useEffect,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Components/Tracker/TrackingPage.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import metamask from "../../Assets/metamask.png";
import { themeContext } from "../../App";
import { useLocation } from "react-router-dom";
import { functionsContext } from "../../Utils/Functions";
import { Web3WalletContext } from "../../Utils/MetamaskConnect";
import { ethers } from "ethers";
import fisrtPumpBrt from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import {
  allInOnePopup,
  conciseAddress,
  PSD_ADDRESS,
  state_token,
} from "../../Utils/ADDRESSES/Addresses";

export const XenTrackingContext = createContext();

export const XenTracking = ({ children }) => {
  const {
    getToBeClaimed,

    getParityDollarClaimed,

    getParityReached,
    handleDepositAutovaults,
    getProtocolFee,
    fetchAutoVaultAmount,
    getUserDistributedTokens,
    approveAndDeposit,
    getClaimAllReward,
  } = useContext(functionsContext);
  const { accountAddress, userConnected } = useContext(Web3WalletContext);
  const [toBeClaimed, setToBeClaimed] = useState("0.0000");
  const ToBeClaimed = async () => {
    try {
      // Get the IPT and RPT rewards
      let iptAndRptReward = await getToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );

      // Get the user's distributed tokens
      let userDistributedTokens = await getUserDistributedTokens(
        accountAddress
      );
      let formattedUserDistributedTokens = parseFloat(userDistributedTokens);

      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      // Get the protocol fee
      let protocolFeeDetail = await getProtocolFee(accountAddress);
      let protocolAmount = protocolFeeDetail?.protocolAmount || 0;

      // Check if parity is reached or exceeded
      let { isParityReachedOrExceed } = await getParityReached(accountAddress);

      // Adjust the total amount to be claimed based on parity status
      let totalToBeClaimed =
        parseFloat(formattedIptAndRptReward) +
        parseFloat(formattedUserDistributedTokens) +
        parseFloat(protocolAmount);

      // Add parity claimable amount only if parity is not reached or exceeded
      if (!isParityReachedOrExceed) {
        totalToBeClaimed += parseFloat(formattedParityClaimableAmount);
      }

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      // Update the state with the total amount to be claimed
      setToBeClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const claimAllReward = async () => {
    console.log("Number(toBeClaimed):", Number(toBeClaimed));
    console.log("toBeClaimed:", toBeClaimed);

    if (Number(toBeClaimed) <= 0) {
      allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
      return;
    }

    try {
      // allInOnePopup(null, 'Processing...', 'Please wait while we claim your rewards', `OK`, null);
      const allReward = await getClaimAllReward(accountAddress);
      await allReward.wait(); // Wait for the transaction to be confirmed
      // setToBeClaimedReward(allReward);
      allInOnePopup(null, "Successfully Claimed", null, `OK`, null);
      console.log("allReward:", allReward);
    } catch (error) {
      if (error.code === 4001) {
        // MetaMask user rejected the transaction
        allInOnePopup(null, "Transaction Rejected", null, `OK`, null);
        console.error("User rejected the transaction:", error.message);
      } else {
        allInOnePopup(null, "Transaction Rejected.", null, `OK`, null);
        console.error(
          "Transaction error:",
          error?.data?.message || error.message
        );
      }
    }
  };
  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
    }
  });
  <XenTrackingContext.Provider
    value={{
      toBeClaimed,
      claimAllReward,
    }}
  >
    {children}
  </XenTrackingContext.Provider>;
};

export default function XENTracking() {
  const { theme } = useContext(themeContext);
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const borderDarkDim =
    (theme === "darkTheme" && "trackingBorder") ||
    (theme === "dimTheme" && "dimThemeTrackBorder");
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  let dark = theme === "lightTheme" && "text-dark";

  const location = useLocation();
  const isInflationXEN = location.pathname === "/inflation-bank-XEN";
  const isHei = !isInflationXEN && "hei";

  const {
    socket,
    getToBeClaimed,
    getPrice,
    getDepositors,
    getParityDollarClaimed,
    getParityDollardeposits,
    getParityTokensDeposits,
    get_PST_Claimed,
    getRatioPriceTargets,
    getIncrementPriceTargets,
    getParityReached,
    handleDepositAutovaults,
    handleDeposit,
    getProtocolFee,
    fetchAutoVaultAmount,
    getUserDistributedTokens,
    approveAndDeposit,
    getClaimAllReward,
    holdTokens,
    XenPrice,
  } = useContext(functionsContext);
  const {
    accountAddress,
    networkName,
    userConnected,
    WalletBalance,
    currencyName,
  } = useContext(Web3WalletContext);
  const [toBeClaimed, setToBeClaimed] = useState("0.0000");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [depositsInround, setParityDollardepositing] = useState("0");
  const [parityTokensDeposits, setParityTokensDeposits] = useState("0");
  const [parityDollarClaimed, setParityDollarClaimed] = useState("0");
  const [HoldAMount, setHoldTokens] = useState("0");
  const [statetokenNavigate, setStateTokenNavigate] = useState("");
  const [parityTokensClaimed, setParityTokensClaimed] = useState("0");
  const [depositAmount, setDepositAmount] = useState("");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [selectedValue, setSelectedValue] = useState("Deposit");
  const [balance, setBalance] = useState("ENTER AMOUNT");
  const [placeHolder, setPlaceHolder] = useState("");
  const [isDashboardInputDisabled, setIsDashboardInputDisabled] =
    useState(false);
  const [search, setSearch] = useState("");
  const [Price, setprice] = useState("0");
  const [PercentageSeted, setPercentage] = useState("0");
  const [Roundtotal, setRoundTotal] = useState("0");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [IsParityReached, setIsParityReached] = useState(false);
  const [totalVaultValue, setTotalVaultSum] = useState("0");
  const explorer_URL = async () => {
    if ((await networkName) === "Polygon Mumbai") {
      return `https://mumbai.polygonscan.com/address`;
    } else if ((await networkName) === "Pulsechain Testnet") {
      return `https://scan.v4.testnet.pulsechain.com/#/address`;
    } else if ((await networkName) === "Pulsechain mainnet") {
      return `https://otter.pulsechain.com/address`;
    } else {
      return `https://mumbai.polygonscan.com/address`;
    }
  };
  const navToExplorer = async () => {
    const baseUrl = await explorer_URL();

    return `${baseUrl}/${PSD_ADDRESS}/`;
  };
  const stateExplorer = async () => {
    const baseUrl = await explorer_URL();

    return `${baseUrl}/${state_token}/`;
  };

  const exploere = async () => {
    try {
      navToExplorer()
        .then((res) => {
          setNavigateToExplorer(res);
        })
        .catch((error) => {});
    } catch (error) {
      console.error(error);
    }
  };
  const explore = async () => {
    try {
      stateExplorer()
        .then((res) => {
          setStateTokenNavigate(res);
        })
        .catch((error) => {});
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    exploere();
    explore();
    // totalReachedPriceTarget();
  });
  const HoldTokensOfUser = async (accountAddress) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      const holdToken = await holdTokens(accountAddress);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log("hold tokensssssss", formattedPrice);
      setHoldTokens(formattedPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accountAddress) {
      HoldTokensOfUser(accountAddress);
    }
  });

  const ToBeClaimed = async () => {
    try {
      // Get the IPT and RPT rewards
      let iptAndRptReward = await getToBeClaimed(accountAddress);
      let formattedIptAndRptReward = ethers.utils.formatEther(
        iptAndRptReward || "0"
      );

      // Get the user's distributed tokens
      let userDistributedTokens = await getUserDistributedTokens(
        accountAddress
      );
      let formattedUserDistributedTokens = parseFloat(userDistributedTokens);

      // Get the parity share tokens claimable amount
      let parityShareTokensDetail = await getParityDollarClaimed(
        accountAddress
      );
      let parityClaimableAmount =
        parityShareTokensDetail?.parityClaimableAmount;
      let formattedParityClaimableAmount = ethers.utils.formatEther(
        parityClaimableAmount || "0"
      );

      // Get the protocol fee
      let protocolFeeDetail = await getProtocolFee(accountAddress);
      let protocolAmount = protocolFeeDetail?.protocolAmount || 0;

      // Check if parity is reached or exceeded
      let { isParityReachedOrExceed } = await getParityReached(accountAddress);

      // Adjust the total amount to be claimed based on parity status
      let totalToBeClaimed =
        parseFloat(formattedIptAndRptReward) +
        parseFloat(formattedUserDistributedTokens) +
        parseFloat(protocolAmount);

      // Add parity claimable amount only if parity is not reached or exceeded
      if (!isParityReachedOrExceed) {
        totalToBeClaimed += parseFloat(formattedParityClaimableAmount);
      }

      // Format the total amount
      let formattedTotalToBeClaimed = totalToBeClaimed.toFixed(4);

      // Update the state with the total amount to be claimed
      setToBeClaimed(formattedTotalToBeClaimed);
    } catch (error) {
      console.log("Error:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  function addCommasAsYouType(e) {
    try {
      const inputValue = e.target.value;
      setDepositAmount(inputValue); // Store the input value as is
      if (/^[0-9,.]*$/.test(inputValue)) {
        const numericValue = inputValue.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        // const formattedWithDecimals = `${formattedValue} .00`;
        setSearch(formattedValue);

        // Convert the numeric value to wei and store it in the state
        const numericValueInWei = ethers.utils
          .parseEther(numericValue || "0")
          .toString();
        setDepositAmount(numericValueInWei); // Store the value in wei form
      }
    } catch (error) {
      console.error("error:", error);
    }
  }

  const handleBlur = () => {
    if (search !== undefined && search !== "" && !search.includes(".")) {
      setSearch(`${search}.00`);
    }
  };

  const isHandleDeposit = async (e) => {
    e.preventDefault();

    // Remove commas from depositAmount before calling approveAndDeposit
    const numericDepositAmount = depositAmount.replace(/,/g, "");

    const isSuccess = await approveAndDeposit(numericDepositAmount);
    if (isSuccess) {
      setSearch("");
    }
  };
  const fetchPrice = async () => {
    try {
      let price = await getPrice();
      let formattedPrice = ethers.utils.formatEther(price || "0");
      setprice(formattedPrice);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const getPlaceHolder = async () => {
    setPlaceHolder(balance);
    setIsDashboardInputDisabled(false);
  };

  useEffect(() => {
    try {
      if (!userConnected) {
        let fixedBalance = Number(WalletBalance || "0").toFixed(4) + " XEN";
        setBalance(fixedBalance);
      }
    } catch (error) {}
  }, [accountAddress, networkName]);
  const ParityDollardeposits = async () => {
    try {
      let ParityDollardeposits = await getParityDollardeposits(accountAddress);
      let formattedParityDollardeposits = ethers.utils.formatEther(
        ParityDollardeposits || "0"
      );
      let fixed = Number(formattedParityDollardeposits).toFixed(2);
      console.log("dollar deposits from parity", fixed);
      setParityDollardepositing(fixed);

      // setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(fixed)) {
        const numericValue = fixed.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        // const formattedWithDecimals = `${formattedValue} .00`;
        setParityDollardeposits(formattedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  let AutoAMount = 0;

  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchAutoVaultAmount(accountAddress);

      console.log("AutoVaults from tracking:", autoVaultAmount);
      const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      AutoAMount += autoVaultAmountNumber;
      setAutoVaultAmount(autoVaultAmountNumber.toFixed(2));
      if (AutoAMount > 1000000) {
        setIsButtonEnabled(true);
      } else {
        setIsButtonEnabled(false);
      }
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };

  const handleDepositAV = async () => {
    try {
      allInOnePopup(null, "Create a new Vault", null, `OK`, null);

      let deposit = await handleDepositAutovaults(AutoAMount);
      deposit.wait();
      allInOnePopup(null, "Done - Inflation Locked", null, `OK`, null);
      // Reset AutoAMount to 0 after successful deposit
      AutoAMount = 0;
      setAutoVaultAmount("0");
      setIsButtonEnabled(false);
    } catch (error) {
      console.error("Deposit error:", error);
    }
  };

  const ParityTokensDeposits = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      if (isInflationXEN) {
        let fixed =
          parseFloat(formattedParityTokensDeposits)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " XEN";
        setParityTokensDeposits(fixed);
      } else {
        let fixed =
          parseFloat(formattedParityTokensDeposits)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " XEN";
        setParityTokensDeposits(fixed);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const mathPSD = async () => {
    try {
      let PSTClaimed = await get_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");

      let Price = await getPrice();
      let formattedPrice = Number(ethers.utils.formatEther(Price || "0"));

      let total_amount = formattedPrice * formatted_PST_Claimed;
      let fixed2 = Number(total_amount).toFixed(10);
      console.log("deposited amountsssssss", fixed2);

      if (/^[0-9,.]*$/.test(fixed2)) {
        const numericValue = fixed2.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        setParityDollarClaimed(formattedValue);
      }
    } catch (error) {
      console.error("error", error);
    }
  };
  const PSTClaimed = async () => {
    try {
      let PSTClaimed = await get_PST_Claimed(accountAddress);
      let formatted_PST_Claimed = ethers.utils.formatEther(PSTClaimed || "0");
      if (isInflationXEN) {
        let fixed =
          parseFloat(formatted_PST_Claimed)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " XEN";
        setParityTokensClaimed(fixed);
      } else {
        let fixed =
          parseFloat(formatted_PST_Claimed)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " XEN";
        setParityTokensClaimed(fixed);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const isParityReached = async () => {
    try {
      let { isParityReachedOrExceed } = await getParityReached(accountAddress);
      setIsParityReached(isParityReachedOrExceed);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  // eslint-disable-next-line no-extend-native
  Number.prototype.noExponents = function () {
    let data = String(this).split(/[eE]/);
    if (data.length === 1) return data[0];

    let z = "",
      sign = this < 0 ? "-" : "",
      str = data[0].replace(".", ""),
      mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str.replace(/^-/, "");
    }
    mag -= str.length;
    while (mag--) z += "0";
    return str + z;
  };

  const claimAllReward = async () => {
    console.log("Number(toBeClaimed):", Number(toBeClaimed));
    console.log("toBeClaimed:", toBeClaimed);

    if (Number(toBeClaimed) <= 0) {
      allInOnePopup(null, "Insufficient Balance", null, `OK`, null);
      return;
    }

    try {
      // allInOnePopup(null, 'Processing...', 'Please wait while we claim your rewards', `OK`, null);
      const allReward = await getClaimAllReward(accountAddress);
      await allReward.wait(); // Wait for the transaction to be confirmed
      // setToBeClaimedReward(allReward);
      allInOnePopup(null, "Successfully Claimed", null, `OK`, null);
      console.log("allReward:", allReward);
    } catch (error) {
      if (error.code === 4001) {
        // MetaMask user rejected the transaction
        allInOnePopup(null, "Transaction Rejected", null, `OK`, null);
        console.error("User rejected the transaction:", error.message);
      } else {
        allInOnePopup(null, "Transaction Rejected.", null, `OK`, null);
        console.error(
          "Transaction error:",
          error?.data?.message || error.message
        );
      }
    }
  };

  const [price, setPrice] = useState("0");
  const [totalSUm, setTotalSum] = useState("0");
  const [escrowVaultTargets, setEscrowVaultTargets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const IncrementPriceTarget = async () => {
    if (accountAddress && currencyName) {
      try {
        let price = await getPrice();
        let formattedPrice = await ethers.utils.formatEther(price || "0");
        setPrice(formattedPrice);

        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let incrementPriceTarget = await getIncrementPriceTargets(address);
          All_USERS_TARGETS.push(...(incrementPriceTarget || []));
        }

        // Filter out targets that have already been reached and passed away from the current price
        const filteredTargets = All_USERS_TARGETS.filter((target) => {
          const formattedPriceTarget = ethers.utils.formatEther(
            target?.priceTarget.toString()
          );
          return Number(formattedPriceTarget) >= Number(formattedPrice);
        });

        // Sort the filtered targets
        const sortedArray = [...(filteredTargets || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.priceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.priceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        // Process and display targets for the current page
        const itemsPerPage = 2500;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsForCurrentPage = sortedArray.slice(startIndex, endIndex);

        try {
          let items = await Promise.all(
            itemsForCurrentPage.map((target, index) =>
              processTargets(target, index, currencyName)
            )
          );
          setEscrowVaultTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  let totalSum = 0;

  const processTargets = async (target, index, currencyName) => {
    try {
      const formattedPriceTarget = ethers.utils.formatEther(
        target?.priceTarget.toString()
      );
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.totalFunds.toString()
      );

      // Add the formattedTargetAmount to the total sum

      console.log("from tracking page", totalSum);

      const PriceTarget = Number(formattedPriceTarget).toFixed(6);
      const targetAmount =
        Number(formattedTargetAmount).toFixed(6) + " " + (await currencyName);

      console.log("from tracking page targetAmount", parseFloat(targetAmount));

      totalSum += parseFloat(formattedTargetAmount);
      setTotalSum(totalSum.toString());

      // Return processed target
      return {
        index,
        PriceTarget,
        targetAmount,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const contract = "0xDe5d82bD18Bdc2B0C1ec1997EE375848a21546f8";
  const IPTmultiplySumWithPrice = async () => {
    // Convert the price to a floating-point number
    // Multiply the total sum with the current price
    const totalPrice = totalSUm * price;

    console.log("price IPT", totalPrice);

    return totalPrice;
  };

  useEffect(() => {
    if (userConnected) {
      IncrementPriceTarget();
      IPTmultiplySumWithPrice();
    }
  });

  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [noOfPage, setNoOfPage] = useState(0);
  const [TotalSum, setTotalSummation] = useState("0");
  const RatioPriceTargets = async () => {
    if (accountAddress) {
      try {
        let All_USERS_TARGETS = [];

        let allDepositorsAddress = await getDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let targets = await getRatioPriceTargets(address);
          All_USERS_TARGETS.push(...(targets || []));
        }

        // Filter out targets that have already been reached and passed away from the current price
        const filteredTargets = All_USERS_TARGETS.filter((target) => {
          const formattedRatioPriceTarget = ethers.utils.formatEther(
            target?.ratioPriceTarget.toString()
          );
          return Number(formattedRatioPriceTarget) >= Number(price);
        });

        // Calculate total pages
        const itemsPerPage = 2500;
        const totalPages = Math.ceil(filteredTargets.length / itemsPerPage);
        setNoOfPage(totalPages); // Update the total number of pages

        // Sort the filtered targets
        const sortedArray = [...(filteredTargets || [])].sort((a, b) => {
          const formattedRatioTargetA = ethers.utils.formatEther(
            a?.ratioPriceTarget.toString()
          );
          const formattedRatioTargetB = ethers.utils.formatEther(
            b?.ratioPriceTarget.toString()
          );

          const numericValueA = Number(formattedRatioTargetA);
          const numericValueB = Number(formattedRatioTargetB);

          return numericValueA - numericValueB;
        });

        // Process and display targets for the current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const itemsForCurrentPage = sortedArray.slice(startIndex, endIndex);

        try {
          let items = await Promise.all(
            itemsForCurrentPage.map((target, index) =>
              processTargetsRPT(target, index, currencyName)
            )
          );
          setRatioPriceTargets(items.filter(Boolean));
        } catch (error) {
          console.error("Error processing targets:", error);
        }
      } catch (error) {
        console.error("error:", error);
      }
    }
  };

  let totalSummation = 0;
  const processTargetsRPT = async (target, index, currencyName) => {
    try {
      const formattedRatioTarget = ethers.utils.formatEther(
        target?.ratioPriceTarget.toString()
      );
      const ratioPriceTarget = Number(formattedRatioTarget).toFixed(6);
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.TargetAmount.toString()
      );
      const targetAmount =
        Number(formattedTargetAmount).toFixed(22) + " " + currencyName ??
        currencyName;

      totalSummation += parseFloat(targetAmount);
      setTotalSummation(totalSummation);
      console.log("from tracking RTP summation", totalSummation);
      return {
        index,
        ratioPriceTarget,
        targetAmount,
      };
    } catch (error) {
      console.log("error:", error);
    }
  };

  const RTPpmultiplySumWithPrice = async () => {
    const totalRTPPrice = TotalSum * price;

    console.log("price RTP", totalRTPPrice);

    return totalRTPPrice;
  };

  const TotalVaultValueLocked = () => {
    const totalvalue = totalSUm * price + TotalSum * price;
    const roundedTotal = Number(totalvalue.toFixed(7));
    console.log("roundeeeeed total", roundedTotal);
    setRoundTotal(roundedTotal);
    // Convert the rounded total to string
    const stringValue = roundedTotal.toString();

    // Check if the string matches the pattern /^[0-9,.]*$/
    if (/^[0-9,.]*$/.test(stringValue)) {
      // Remove commas and then add them back using the regex pattern
      const formattedValue = stringValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setTotalVaultSum(formattedValue);
      console.log("total value locked", formattedValue);
      return formattedValue;
    } else {
      // If the string doesn't match the pattern, set the total as it is
      setTotalVaultSum(stringValue);
      console.log("total value locked", stringValue);
      return stringValue;
    }
  };

  const percentage = () => {
    const deposits = Number(depositsInround);
    const vaultValue = Number(Roundtotal);

    if (!isNaN(deposits) && !isNaN(vaultValue) && vaultValue !== 0) {
      let division = deposits / vaultValue;
      setPercentage(division.toFixed(4));
    } else {
      setPercentage("0.00");
    }
  };
  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
      RTPpmultiplySumWithPrice();
      percentage();
      TotalVaultValueLocked();
    }
  });

  useEffect(() => {
    if (userConnected) {
      ToBeClaimed();
      ParityDollardeposits();
      getPlaceHolder();
      ParityTokensDeposits();
      fetchAutoVaultAmounts();
      fetchPrice();
      mathPSD();
      PSTClaimed();
      isParityReached();
    }
  });

  const tooltip =
    (theme === "dimTheme" && "dim-tooltip") ||
    (theme === "darkTheme" && "dark-tooltip");

  //Testing purpose this code written here

  return (
    <>
      <div
        className={`top-container ${
          (theme === "darkTheme" && "darkThemeTrackingBg") ||
          (theme === "dimTheme" && "dimTheme-index-class")
        }`}
      >
        <div
          className={`top-container ${isHei} container-xxl  ${
            (theme === "darkTheme" && "darkThemeTrackingBg") ||
            (theme === "dimTheme" && "dimTheme-index-class")
          }`}
        >
          <div
            className={`main-section ${shadow} me-auto card d-flex flex-wrap py-3 px-3 ${
              (theme === "darkTheme" && "Theme-block-container") ||
              (theme === "dimTheme" && "dimThemeBg")
            }`}
          >
            <div className="row g-lg-10">
              <div
                className={`col-md-4 border-right ${borderDarkDim} col-lg-3 d-flex flex-column justify-content-between`}
              >
                <div>
                  <div className={`d-flex uniqHeightxyz`}>
                    <div className=" margin-right">
                      <i
                        className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                      ></i>
                    </div>
                    <div
                      className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                    >
                      <div>
                        <div className={`${textTitle}`}>
                          DEPOSIT TOKENS INTO THE INFLATION BANK
                        </div>
                        <form>
                          <input
                            className={` form-control   inputactive input-padding place-padding ${block} ${textTitle} ${
                              theme === "lightTheme"
                                ? "depositInputLight input-placeholder-light"
                                : ""
                            } ${
                              theme === "dimTheme"
                                ? "depositInputGrey darkColor input-placeholder-dim"
                                : ""
                            } ${
                              theme === "darkTheme"
                                ? "depositInputDark darkColor input-placeholder-dark"
                                : ""
                            }${theme === "dimTheme" && "dimThemeBtnBg"}`}
                            pattern="[0-9,.]*" // Only allow digits, commas, and dots
                            type="text"
                            disabled={isDashboardInputDisabled}
                            onBlur={handleBlur}
                            value={search}
                            placeholder={placeHolder}
                            onChange={(e) => addCommasAsYouType(e)}
                            style={{
                              backgroundColor: "transparent",
                              width: "235px",
                              height: "37px", // Adjust height as needed
                              padding: "5px", // Adjust padding as needed
                              fontWeight: "normal",
                              fontSize: "15px",
                            }}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex bt-padding align-items-center pumpBoxImg">
                    <button
                      onClick={(e) => {
                        isHandleDeposit(e);
                      }}
                      className={`first_pump_boxIcon ${
                        (theme === "darkTheme" && "firstdumDark") ||
                        (theme === "dimTheme" && "dimThemeBg")
                      } `}
                      // style={{
                      //   cursor: "not-allowed",
                      // }}
                    >
                      <img
                        src={fisrtPumpBrt}
                        alt="firstpump"
                        className="w-100 h-100"
                      />
                    </button>
                  </div>
                </div>
                <div className="hrp">{/* <hr className="my-3" /> */}</div>
                <div className="d-flex h-40">
                  <div className="margin-right">
                    <i
                    // className={`iconSize fa-solid fa-cubes-stacked ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start  ${textTheme}`}
                  >
                    <div>
                      <div
                        className={`${textTitle} `}
                        style={{ fontSize: "11px", marginLeft: "60px" }}
                      >
                        {/* Contract Address{" "} */}
                      </div>

                      <div className={`varSize ${spanDarkDim}`}>
                        <div
                          style={{ marginTop: "-50px", marginRight: "35px" }}
                          className={`info-item2  ${
                            (theme === "darkTheme" && "Theme-btn-block") ||
                            (theme === "dimTheme" && "dimThemeBtnBg")
                          } `}
                        >
                          <p className="contract">
                            Contract Address{" "}
                            <div
                              // to={navigateToExplorer}
                              target="_blank"
                              className={`info-link ${textTitle} ${spanDarkDim}`}
                            >
                              <p className="contract1"> PENDING AUDIT</p>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-end pb-3"></div>
                </div>
              </div>
              <div
                className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
              >
                <hr className="d-block d-lg-none d-md-none " />
                <div className="d-flex h-50">
                  <div className="d-flex uniqHeightxyz"></div>
                  <div className="margin-right ">
                    <i
                      className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                  >
                    <div className={`${textTitle}`}>
                      <div className={`${textTitle}`}>TO BE CLAIMED</div>
                      <div className="varSize">
                        <span className={`spanText ${spanDarkDim}`}>
                          <div>{toBeClaimed + " XEN"}</div>
                        </span>
                      </div>
                      <div className="d-flex align-items-center pumpBoxImg deposit-bt">
                        <button
                          onClick={() => {
                            claimAllReward();
                          }}
                          className={`first_pump_boxIcon ${
                            (theme === "darkTheme" && "firstdumDark") ||
                            (theme === "dimTheme" && "dimThemeBg")
                          } `}
                        >
                          <img
                            src={fisrtPumpBrt}
                            alt="firstpump"
                            className="w-100 h-100"
                          />
                        </button>
                      </div>
                    </div>

                    <div className="d-flex align-items-end pb-3">
                      <span
                        className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                        data-tooltip="CLAIM REWARDS"
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="d-flex h-50">
                  <div className="margin-right">
                    <i
                      className={`iconSize fa-regular fa-money-bill-1 ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                  >
                    <div>
                      <div className={`${textTitle}`}>
                        <div className={` ${textTitle} `}> PSD</div>{" "}
                      </div>
                      <div className={`varSize `}>
                        <span className={`spanText ${spanDarkDim}`}>
                          {" "}
                          $ {parityDollardeposits} ({PercentageSeted} %)
                        </span>
                      </div>
                      <div>
                        <div
                          className={`${textTitle}`}
                          style={{ marginTop: "10px" }}
                        ></div>
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim} fs-5`}>
                            <>$ {parityDollarClaimed}</>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-end pb-3">
                    <span
                      style={{ marginTop: "90px" }}
                      className={`${tooltip} heightfixBug hoverText tooltipAlign`}
                      data-tooltip="Parity Shares in Dollars. Indicating the total $ value deposited  AND CLAIMED"
                      data-flow="bottom"
                    >
                      {" "}
                      <i
                        className={`fas mx-2 fa-exclamation-circle ${theme}`}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={`col-md-4 border-right col-lg-3 d-flex flex-column justify-content-center ${borderDarkDim}`}
              >
                <hr className="d-block d-lg-none d-md-none " />

                <div className="d-flex h-50">
                  <div className="margin-right">
                    <i
                      className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                  >
                    <div>
                      <div className={`${textTitle}`}>
                        <div
                          className={`${textTitle} `}
                          style={{ fontSize: "11px" }}
                        >
                          Decentralized Autonomous Vaults
                        </div>{" "}
                        <div className={`varSize ${spanDarkDim}`}>
                          <span className={`spanText ${spanDarkDim} `}>
                            {" "}
                            <>{autoVaultAmount} XEN</>
                          </span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center pumpBoxImg deposit-bt">
                        <button
                          onClick={() => {
                            if (isButtonEnabled) {
                              handleDepositAV();
                            }
                          }}
                          className={`first_pump_boxIcon ${
                            (theme === "darkTheme" && "firstdumDark") ||
                            (theme === "dimTheme" && "dimThemeBg")
                          } ${!isButtonEnabled ? "disabled-button" : ""}`}
                          disabled={!isButtonEnabled}
                          style={{
                            cursor: isButtonEnabled ? "pointer" : "not-allowed",
                          }}
                        >
                          <img
                            src={fisrtPumpBrt}
                            alt="firstpump"
                            className="w-100 h-100"
                          />
                        </button>
                      </div>
                    </div>
                    <div className="d-flex align-items-end pb-3">
                      <span
                        className={`${tooltip} hoverText tooltipAlign`}
                        data-tooltip="ONLY APPLICABLE TO DAV TOKEN HOLDERS."
                        data-flow="bottom"
                      >
                        {" "}
                        <i
                          className={`fas mx-2 fa-exclamation-circle ${theme}`}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="d-flex h-70" style={{ height: "-100px" }}>
                  <div className="margin-right">
                    <i
                      className={`iconSize fa-solid fa-arrow-up-right-dots ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme}`}
                  >
                    <div>
                      <div className={`${textTitle}`}>
                        <div className={``}> PST </div>
                      </div>
                      <div className={`varSize ${spanDarkDim}`}>
                        <span className={`spanText ${spanDarkDim}`}>
                          {" "}
                          {parityTokensDeposits}
                        </span>
                        <div
                          className={`varSize ${spanDarkDim}`}
                          style={{ marginTop: "10px" }}
                        >
                          <span className={`spanText ${spanDarkDim} fs-5`}>
                            {parityTokensClaimed}

                            {IsParityReached && (
                              <span
                                className={`${tooltip} hoverText hoverText`}
                                style={{ color: "red" }}
                                data-tooltip="Token Parity Achieved"
                                data-flow="bottom"
                              >
                                {" "}
                                <i
                                  className={`fas mx-2 fa-exclamation-circle ${theme}`}
                                ></i>
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* <InfoBox data='Indicating the total number of tokens claimed' /> */}
                  </div>
                  <div className="d-flex align-items-end pb-3">
                    <span
                      style={{ marginTop: "90px" }}
                      className={`${tooltip} hoverText tooltipAlign`}
                      data-tooltip="Parity Shares in Tokens. Indicating the total tokens deposited  AND CLAIMED"
                      data-flow="bottom"
                    >
                      {" "}
                      <i
                        className={`fas mx-2 fa-exclamation-circle ${theme}`}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className=" col-lg-3 extraFlex">
                <hr className="d-lg-none d-block my-3" />

                <div className="d-flex pt-1">
                  <div className="margin-right">
                    <i
                      className={`iconSize fa-solid fa-money-bill-transfer ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start justify-content-between ${textTheme}`}
                  >
                    <div className={`${textTitle}`}>XEN PRICE</div>

                    <div className={`varSize ${spanDarkDim}`}>
                      <span className={`spanText ${spanDarkDim}`}>
                        <>$ {Price + " XEN"}</>
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-end pb-3">
                    <span
                      className={`${tooltip} hoverText tooltipAlign`}
                      style={{ marginTop: "80px" }}
                      data-tooltip="CURRENT TOKEN PRICE"
                      data-flow="bottom"
                    >
                      {" "}
                      <i
                        className={`fas mx-2 fa-exclamation-circle ${theme}`}
                      ></i>
                    </span>
                  </div>
                </div>
                <div style={{ marginTop: "-1px" }}>
                  <div className="hrp">
                    <hr className="my-3 " />
                  </div>
                </div>
                <div className="d-flex  h-50">
                  <div className="margin-right ">
                    <i
                      className={`iconSize fa-solid fa-comments-dollar ${theme}`}
                    ></i>
                  </div>
                  <div
                    className={`flex-grow-1 fontSize text-start d-flex justify-content-between ${textTheme} `}
                  >
                    <div>
                      <div className={`${textTitle}  `}>
                        <div className={`${textTitle}  `}>
                          $ TVL ( LIQUIDITY )
                        </div>{" "}
                      </div>
                      <div className={`varSize ${spanDarkDim}`}>
                        <span className={`spanText ${spanDarkDim} fs-5`}>
                          {" "}
                          <>$ {totalVaultValue}</>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-end pb-3">
                    <span
                      className={`${tooltip} hoverText tooltipAlign`}
                      data-tooltip="The number of tokens in vaults * current price."
                      data-flow="bottom"
                    >
                      {" "}
                      <i
                        className={`fas mx-2 fa-exclamation-circle ${theme}`}
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
