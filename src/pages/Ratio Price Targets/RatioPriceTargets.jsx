import React, { useContext, useState, useEffect } from "react";
import "./RatioPriceTargets.css";
import "../../Utils/Theme.css";
import { Link } from "react-router-dom";
import { themeContext } from "../../App";
// import { TotalSumProvider  } from "../../Components/Tracker/TrackingPage";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { functionsContext } from "../../Utils/Functions";
import { ethers } from "ethers";
import iconLink from "./download.svg";
import metamask from "../../Assets/metamask.png";
import firstPump from "../../Assets/fistPumpBox.svg";

import {
  PSD_ADDRESS,
  conciseAddress,
  state_token,
} from "../../Utils/ADDRESSES/Addresses";

export default function RatioPriceTargets() {
  // const {setsumofPoints} = useContext(airdrop)
  const { theme } = useContext(themeContext);
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  let dark = theme === "lightTheme" && "text-dark";

  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");
  const { accountAddress, currencyName, userConnected, networkName } =
    useContext(Web3WalletContext);
  const {
    socket,
    getRatioPriceTargets,
    getPrice,
    getDepositors,
    getTimeStampForCreateValut,
    getParityTokensDeposits,
    getParityDollardeposits,
    holdTokens,
    fetchAutoVaultAmount,
    getTotalMintedTokens,
  } = useContext(functionsContext);
  const [ratioPriceTargets, setRatioPriceTargets] = useState([]);
  const [price, setPrice] = useState("0");
  const [seeFullPage, setseeFullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArray, setFilteredArray] = useState([]);
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [statetokenNavigate, setStateTokenNavigate] = useState("");
  const [DayStamp, setDayStamp] = useState("0");
  const [paritydeposit, setParitydeposit] = useState("0");
  const [HoldAMount, setHoldTokens] = useState("0");
  const [totalMinted, setTotalMinted] = useState("0");
  const [autoVaultAmount, setAutoVaultAmount] = useState("0");
  const [parityDollardeposits, setParityDollardeposits] = useState("0");
  const [parityTokensDeposits, setParityTokensDeposits] = useState("0");
  const [totalsumofPOints, setsumofPoints] = useState("0");

  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const ParityDollardeposits = async () => {
    try {
      let ParityDollardeposits = await getParityDollardeposits(accountAddress);
      let formattedParityDollardeposits = ethers.utils.formatEther(
        ParityDollardeposits || "0"
      );
      let fixed = Number(formattedParityDollardeposits).toFixed(2);

      // setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(fixed)) {
        const numericValue = fixed.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedWithDecimals = `${formattedValue} .00`;
        setParityDollardeposits(formattedValue);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const ParityTokensDeposits = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        parseFloat(formattedParityTokensDeposits)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        " " +
        currencyName;
      setParityTokensDeposits(fixed);
    } catch (error) {
      console.error(error);
    }
  };
  const explorer_URL = async () => {
    if ((await networkName) === "Polygon Mumbai") {
      return `https://mumbai.polygonscan.com/address`;
    } else if ((await networkName) === "Pulsechain Testnet") {
      return `https://scan.v4.testnet.pulsechain.com/#/address`;
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
      stateExplorer().then((res) => {
        setStateTokenNavigate(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const addTokenToWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20", // Indicates that this is an ERC20 token
            options: {
              address: "0xfE1BBD793C5C055b116C43D23FC0727AAFA89Ec9", // The address of the token contract
              symbol: "DAVPLS", // A ticker symbol or shorthand, up to 5 characters
              decimals: "18", // The number of decimals in the token
              image: { firstPump }, // A string url of the token logo
            },
          },
        });
      } catch (error) {
        console.error("Failed to add token to wallet", error);
      }
    } else {
      console.error("MetaMask is not installed");
    }
  };

  useEffect(() => {
    exploere();
    // totalReachedPriceTarget();
  }, [accountAddress, networkName]);

  const HoldTokensOfUser = async (accountAddress) => {
    try {
      if (!accountAddress) {
        throw new Error("Account address is undefined");
      }
      const holdToken = await holdTokens(accountAddress);
      const formattedPrice = ethers.utils.formatEther(holdToken || "0");
      console.log("hold tokens", formattedPrice);
      setHoldTokens(formattedPrice);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (accountAddress) {
      HoldTokensOfUser(accountAddress);
    }
  }, [accountAddress]);

  const fetchAutoVaultAmounts = async (address) => {
    try {
      let autoVaultAmount = await fetchAutoVaultAmount(accountAddress);
      const fixedAuto = Number(autoVaultAmount).toFixed(2);

      console.log("AutoVaultss from ratio:", autoVaultAmount);
      // Convert the AutoVault amount to a number for comparison
      // const autoVaultAmountNumber = parseFloat(autoVaultAmount);

      setAutoVaultAmount(fixedAuto);
    } catch (error) {
      console.error("fetchAutoVaultAmounts error:", error);
      setAutoVaultAmount("0");
    }
  };
  const ParityTokensDepositforPoint = async () => {
    try {
      let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
      let formattedParityTokensDeposits = ethers.utils.formatEther(
        ParityTokensDeposits || "0"
      );
      let fixed =
        parseFloat(formattedParityTokensDeposits)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ";
      setParitydeposit(fixed);
    } catch (error) {
      console.error(error);
    }
  };

  const totalsumofPoints = () => {
    try {
      let sum =
        parseFloat(paritydeposit.replace(/,/g, "")) +
        parseFloat(parityDollardeposits.replace(/,/g, ""));
      let fixed =
        parseFloat(sum)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ";

      setsumofPoints(fixed);
    } catch (error) {
      console.log(error);
    }
  };
  const itemsPerPage = 25;

  const RatioPriceTargets = async () => {
    if (accountAddress) {
      try {
        let price = await getPrice();
        let formattedPrice = await ethers.utils.formatEther(price || "0");
        setPrice(formattedPrice);

        let All_USERS_TARGETS = [];
        let allDepositorsAddress = await getDepositors();

        for (let index = 0; index < allDepositorsAddress.length; index++) {
          const address = allDepositorsAddress[index];
          let targets = await getRatioPriceTargets(address);
          All_USERS_TARGETS.push(...(targets || []));
        }

        // Sort the targets
        const sortedArray = [...(All_USERS_TARGETS || [])].sort((a, b) => {
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

        // Remove reached targets
        const newFilteredArray = sortedArray.filter(
          (target) => !target.isClosed
        );
        setFilteredArray(newFilteredArray);

        // Process and display targets for the current page
        updateCurrentPageItems(newFilteredArray, currentPage);
      } catch (error) {
        console.error("error:", error);
      }
    }
  };
  const getDay = async () => {
    const Day = await getTimeStampForCreateValut();
    setDayStamp(Day);
  };
  const updateCurrentPageItems = async (array, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsForCurrentPage = array.slice(startIndex, endIndex);

    try {
      let items = await Promise.all(
        itemsForCurrentPage.map((target, index) =>
          processTargets(target, index, currencyName)
        )
      );
      setRatioPriceTargets(items.filter(Boolean));
    } catch (error) {
      console.error("Error processing targets:", error);
    }
  };

  const processTargets = async (target, index, currencyName) => {
    try {
      const formattedRatioTarget = ethers.utils.formatEther(
        target?.ratioPriceTarget.toString()
      );
      const ratioPriceTarget = Number(formattedRatioTarget).toFixed(6);
      const formattedTargetAmount = ethers.utils.formatEther(
        target?.TargetAmount.toString()
      );
      const targetAmount =
        Number(formattedTargetAmount).toFixed(4) + " " + currencyName ??
        currencyName;
      const givenTimestamp = target?.Time.toString();
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const timeDifferenceInSeconds = currentTimestamp - Number(givenTimestamp);
      const timeDifference = await formatTimeDifference(
        Number(timeDifferenceInSeconds)
      );

      if (!target.isClosed)
        return (
          <div
            key={index}
            className={`box-items  ${
              (theme === "darkTheme" && "Theme-box-item") ||
              (theme === "dimTheme" &&
                "dim-theme-items" &&
                "dim-theme-items-border") ||
              "viewItemsTop"
            }`}
          >
            <div className="box-1" id="box1">
              <div>
                <p>
                  {" "}
                  <span>Transaction</span>{" "}
                </p>
                <p
                  className={`${
                    (theme === "darkTheme" && "Theme-block-time") ||
                    (theme === "dimTheme" && "Theme-block-time") ||
                    "time-opacity "
                  }`}
                >
                  {timeDifference} ago
                </p>
              </div>
            </div>
            <div className="box-1 box-2" id="box2">
              <p
                className={`d-flex flex-column para-column-fit  ${
                  (theme === "darkTheme" && "Theme-col2-para") ||
                  (theme === "dimTheme" && "Theme-col2-para")
                }`}
              >
                Target Price<span> Target Price : $ {ratioPriceTarget}</span>{" "}
              </p>
            </div>
            <p
              className={`box-3  ${
                (theme === "darkTheme" && "Theme-btn-block") ||
                (theme === "dimTheme" && "dimThemeBtnBg")
              }`}
            >
              {" "}
              {targetAmount}
            </p>
          </div>
        );
    } catch (error) {
      console.log("error:", error);
    }
  };

  const formatTimeDifference = async (seconds) => {
    if (seconds >= 60 * 60 * 24) {
      const days = Math.floor(seconds / (24 * 60 * 60));
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (seconds >= 60 * 60) {
      const hours = Math.floor(seconds / (60 * 60));
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (seconds >= 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds !== 1 ? "s" : ""}`;
    }
  };
  useEffect(() => {
    const fetchTotalMintedTokens = async () => {
      try {
        const total = await getTotalMintedTokens();
        setTotalMinted(total);
      } catch (error) {
        console.error("Error fetching total minted tokens:", error);
      }
    };

    fetchTotalMintedTokens();
  }, []);

  useEffect(() => {
    if (userConnected) {
      RatioPriceTargets();
      fetchAutoVaultAmounts();
      ParityDollardeposits();
      ParityTokensDeposits();
      ParityTokensDepositforPoint();
      totalsumofPoints();
      getDay();
    }
  }, [accountAddress, currencyName, theme, socket]);

  useEffect(() => {
    if (filteredArray.length > 0) {
      updateCurrentPageItems(filteredArray, currentPage);
    }
  }, [currentPage, filteredArray]);

  return (
    <>
      <div className=" ">
        <div
          className={`container-1 ${
            (theme === "darkTheme" && "Theme-block-container") ||
            (theme === "dimTheme" && "dimThemeBg") ||
            shadow
          } `}
        >
          <div
            className={`box-titles1 mx-3 ${theme === "darkTheme" && ""} `}
            id={``}
          >
            <h1
              className={`box-title mb-3 ${
                (theme === "darkTheme" && "bg-dark" && "text-white") ||
                (theme === "dimTheme" && "title-color")
              }`}
            >
              Ratio Price Targets (rPT)
            </h1>
          </div>
          <div
            className={`${
              seeFullPage ? "seenFullContent" : ""
            } reponsive-box1 `}
          >
            {ratioPriceTargets}
          </div>
          <div className="view-main">
            <div
              className={`view-pagerpt  ${
                (theme === "darkTheme" && "Theme-view-page") ||
                (theme === "dimTheme" &&
                  "dimThemeBlockView" &&
                  "dim-theme-items-border")
              } `}
            >
              <div></div>

              <div
                className={`table_pageIndex ${
                  theme === "dimTheme" && "text-white"
                }`}
              >
                <span
                  className="pageBtnDir"
                  onClick={() => {
                    if (currentPage > 1) {
                      setCurrentPage(currentPage - 1); // Decrement current page
                    }
                  }}
                >
                  &#10216;
                </span>
                <span>
                  {currentPage} /{" "}
                  {Math.ceil(filteredArray.length / itemsPerPage)}
                </span>
                <span
                  className="pageBtnDir"
                  onClick={() => {
                    if (
                      currentPage <
                      Math.ceil(filteredArray.length / itemsPerPage)
                    ) {
                      setCurrentPage(currentPage + 1); // Increment current page
                    }
                  }}
                >
                  &#10217;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
