import React, { useContext, useEffect, useState } from "react";
import "../../Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import "./Searchbar.css";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import Quick_Guide from "../../Assets/Docs/Quick Guide - System State V1.5.pdf";
import { Link, useLocation } from "react-router-dom";
import fistPump from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import SystemStateLogo from "../../Assets/High-Resolutions-Svg/Updated/logo.svg";
import { functionsContext } from "../../Utils/Functions";
import { PSD_ADDRESS, conciseAddress } from "../../Utils/ADDRESSES/Addresses";
import { ethers } from "ethers";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [isDashboardInputDisabled, setIsDashboardInputDisabled] =
    useState(false);
  const [isBuyTokenInputDisabled, setIsBuyTokenInputDisabled] = useState(false);

  const { theme } = useContext(themeContext);
  let block =
    (theme === "lightTheme" && theme + " translite") ||
    (theme === "darkTheme" && theme + " transdark") ||
    (theme === "dimTheme" && theme + " transdim");
  let dark = theme === "lightTheme" && "text-dark";

  function addCommasAsYouType(e) {
    try {
      const inputValue = e.target.value;
      setDepositAmount(inputValue);
      if (/^[0-9,.]*$/.test(inputValue)) {
        const numericValue = inputValue.replace(/,/g, "");
        const formattedValue = numericValue.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        );
        const formattedWithDecimals = `${formattedValue} .00`;
        setSearch(formattedValue);
      }
    } catch (error) {
      console.error("error:", error);
    }
  }

  const handleBlur = () => {
    if (search != undefined && search != "" && !search.includes(".")) {
      setSearch(`${search}.00`);
    }
  };
  const location = useLocation();
  const isHome = location.pathname === "/mint";
  const isAlpha = location.pathname === "/alpharoom";
  const isInflation = location.pathname === "/inflation-bank";
  const isVisible = !isHome && "isVisible";
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [selectedValue, setSelectedValue] = useState("Deposit");
  const [buyTokenSelector, setBuyTokenSelector] = useState("Inscribe");
  const [balance, setBalance] = useState("Enter Amount");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [toBeClaimed, setToBeClaimed] = useState("0");
  const [LimitDeposit, setLimitDeposit] = useState("0");
  const [claimParityTokens, setClaimParityTokens] = useState("0");
  const [protocolFee, setProtocolFee] = useState("0");
  const [placeHolder, setPlaceHolder] = useState("");
  const [allRewardAmount, setAllRewardAmount] = useState("");
  const [price, setprice] = useState(0);

  const {
    socket,
    // handleDeposit,
    // getToBeClaimed,
    // handle_Claim_IPT_and_RPT,
    // handle_Claim_Protocol_Fee,
    // handle_Claim_Parity_Tokens,
    // handle_Claim_All_Reward_Amount,
    // getParityDollarClaimed,
    // getFormatEther,
    // getProtocolFee,
    // getParityTokensDeposits,
    getPrice,
  } = useContext(functionsContext);
  const {
    accountAddress,
    networkName,
    userConnected,
    WalletBalance,
    currencyName,
  } = useContext(Web3WalletContext);

  // const ParityTokensDeposits = async () => {
  //   try {
  //     let ParityTokensDeposits = await getParityTokensDeposits(accountAddress);
  //     let formattedParityTokensDeposits = ethers.utils.formatEther(
  //       ParityTokensDeposits || "0"
  //     );
  //     let limtDeposit = parseFloat(formattedParityTokensDeposits).toFixed(2);
  //     console.log("limit deposit from search", LimitDeposit);
  //     setLimitDeposit(limtDeposit);
  //     setTotalDeposits(parseFloat(limtDeposit));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  // const isHandleDeposit = async (e) => {
  //   e.preventDefault();

  //   if (selectedValue === "Deposit") {
  //     const isSuccess = await handleDeposit(depositAmount);
  //     if (isSuccess) {
  //       setSearch("");
  //     }
  //   } else if (selectedValue === "Claim IPT & RPT") {
  //     handle_Claim_IPT_and_RPT(accountAddress);
  //   } else if (selectedValue === "Claim Parity Tokens") {
  //     handle_Claim_Parity_Tokens(accountAddress);
  //   } else if (selectedValue === "Claim Protocol Fee") {
  //     handle_Claim_Protocol_Fee(accountAddress);
  //   } else if (selectedValue === "Claim All Reward") {
  //     handle_Claim_All_Reward_Amount(accountAddress);
  //   }
  // };
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
    if (isHome) {
      if (selectedValue === "Deposit") {
        setPlaceHolder(balance);
        setIsDashboardInputDisabled(false);
      } else if (selectedValue === "Claim IPT & RPT") {
        setPlaceHolder(toBeClaimed);
        setIsDashboardInputDisabled(true);
        setSearch("");
      } else if (selectedValue === "Claim Parity Tokens") {
        setPlaceHolder(claimParityTokens);
        setIsDashboardInputDisabled(true);
        setSearch("");
      } else if (selectedValue === "Claim Protocol Fee") {
        console.log("setPlaceHolder(protocolFee):", protocolFee);
        setPlaceHolder(protocolFee);
        setIsBuyTokenInputDisabled(true);
        setSearch("");
      } else if (selectedValue === "Claim All Reward") {
        console.log("allrewardAmount:", allRewardAmount);
        setPlaceHolder(allRewardAmount);
        setIsDashboardInputDisabled(true);
        setSearch("");
      }
    } else {
      if (buyTokenSelector === "Inscribe") {
        setPlaceHolder(balance);
        setIsBuyTokenInputDisabled(false);
      }
    }
  };
  // const ProtocolFee = async () => {
  //   try {
  //     let protocolFee = await getProtocolFee(accountAddress);
  //     let protocolAmount = await protocolFee?.protocolAmount;
  //     let fixed = Number(protocolAmount).toFixed(4) + " " + currencyName;
  //     setProtocolFee(fixed);
  //   } catch (error) {
  //     console.error("error:", error);
  //   }
  // };
  const getSelector = () => {
    if (userConnected && networkName === "Polygon Mumbai") {
      return (
        <option className={`${theme} option-list `} value="Polygon Mumbai">
          {" "}
          Polygon (MATIC)
        </option>
      );
    } else if (userConnected && networkName === "Pulsechain") {
      return (
        <option className={`${theme} option-list `} value="PLS">
          {" "}
          Pulsechain (PLS)
        </option>
      );
    } else if (userConnected && networkName === "PulsechainX") {
      return (
        <option className={`${theme} option-list `} value="PLSX">
          {" "}
          PulseX (PLSX)
        </option>
      );
    } else {
      return (
        <>
          <option className={`${theme} option-list `} value="Matic">
            {" "}
            Matic (MATIC)
          </option>
          <option className={`${theme} option-list `} value="PLS">
            {" "}
            Pulsechain (PLS)
          </option>
          <option className={`${theme} option-list `} value="PLSX">
            {" "}
            PulseX (PLSX)
          </option>
          <option className={`${theme} option-list `} value="2">
            HEX (pHEX)
          </option>
          <option className={`${theme} option-list `} value="3">
            XEN (pXEN)
          </option>
          <option className={`${theme} option-list `} value="3">
            Atropa (ATROPA)
          </option>
          <option className={`${theme} option-list `} value="3">
            Dai (pDAI)
          </option>
          <option className={`${theme} option-list `} value="3">
            Teddybear (BEAR)
          </option>
          <option className={`${theme} option-list `} value="3">
            TSFi (TSFi)
          </option>
          <option className={`${theme} option-list `} value="3">
            BTC (pwBTC)
          </option>
          <option className={`${theme} option-list `} value="3">
            Shiba (pSHIB)
          </option>
          <option className={`${theme} option-list `} value="3">
            Pepe (pPEPE)
          </option>
        </>
      );
    }
  };

  const explorer_URL = async () => {
    if ((await networkName) === "Polygon Mumbai") {
      return `https://mumbai.polygonscan.com/address`;
    } else {
      return `https://mumbai.polygonscan.com/address`;
    }
  };
  const navToExplorer = async () => {
    const baseUrl = await explorer_URL();
    if (isHome) {
      return `${baseUrl}/${PSD_ADDRESS}`;
    } else {
      // return `${baseUrl}/${STATE_TOKEN_ADDRES}`
    }
  };

  // // Done
  // const ToBeClaimed = async () => {
  //   try {
  //     let toBeClaimed = await getToBeClaimed(accountAddress);
  //     let formattedToBeClaimed = ethers.utils.formatEther(
  //       toBeClaimed ? toBeClaimed : "0"
  //     );
  //     let fixed = Number(formattedToBeClaimed).toFixed(4);
  //     setToBeClaimed(fixed);
  //   } catch (error) {
  //     console.log("error:", error);
  //   }
  // };
  // const getClaimParityTokens = async () => {
  //   let ParityShareTokensDetail = await getParityDollarClaimed(accountAddress);
  //   let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount;
  //   let parityClaimableAmountFormatted = await getFormatEther(
  //     parityClaimableAmount
  //   );
  //   let fixed = Number(parityClaimableAmountFormatted).toFixed(4);
  //   setClaimParityTokens(fixed);
  // };
  // const AllRewardAmount = async () => {
  //   let userBucketBalance = await getToBeClaimed(accountAddress);
  //   let formattedToBeClaimed = await getFormatEther(userBucketBalance || "0");

  //   let ParityShareTokensDetail = await getParityDollarClaimed(accountAddress);
  //   let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount;
  //   let parityClaimableAmountFormatted = await getFormatEther(
  //     parityClaimableAmount
  //   );

  //   let protocolFee = await getProtocolFee(accountAddress);
  //   let protocolAmount = await protocolFee?.protocolAmount;

  //   let AllFee =
  //     Number(formattedToBeClaimed) +
  //     Number(parityClaimableAmountFormatted) +
  //     Number(protocolAmount);

  //   let fixed =
  //     (AllFee.toFixed(4) === "NaN" ? "0" : AllFee.toFixed(4)) +
  //     " " +
  //     currencyName;
  //   setAllRewardAmount(fixed);
  // };
  useEffect(() => {
    try {
      getSelector();
      navToExplorer()
        .then((res) => {
          setNavigateToExplorer(res);
        })
        .catch((error) => {});
      if (!userConnected) {
        let fixedBalance =
          Number(WalletBalance || "0").toFixed(4) + " " + currencyName;
        setBalance(fixedBalance);
      }
    } catch (error) {}
  }, [accountAddress, networkName]);
  useEffect(() => {
    if (userConnected) {
      let fixedBalance =
        Number(WalletBalance || "0").toFixed(4) + " " + currencyName;
      setBalance(fixedBalance);
      // ToBeClaimed();
      // getClaimParityTokens();
      fetchPrice();
      // ParityTokensDeposits();
      getPlaceHolder();
      // ProtocolFee();
      // AllRewardAmount();
    }
  }, [socket]);

  const isOnInscription = "active";

  return (
    <>
      <div
        className={`main-search p-0 lightBg darkBg ${
          (theme === "darkTheme" && "seachThemeBgDark") ||
          (theme === "dimTheme" && "seachThemeBgDim")
        }`}
      >
        <div className="d-flex serach-container container-xxl">
          <div className="d-flex w-100 my-auto">
            <div className="d-flex flex-wrap justify-content-between w-100 searchBar">
              <div className="input-search firstSeach_small col-md-7 py-3">
                <div
                  style={{
                    fontSize: "14px",
                    color: "#ffffff",
                    marginBottom: "15px",
                    marginLeft: "3px",
                    marginTop: "-10px",
                  }}
                >
                  {/* <p>
                    {" "}
                    <br/>
                    System State Protocol is the first crypto INFLATION BANK to
                    provide market-making services for crypto assets.
                    <br />
                    Mint DAV tokens to access the ALPHA ROOM, where users gain
                    insights into projects receiving our market-making services.
                    <br />
                    INFLATION BANK - Locks inflation into ratio-based vaults,
                    releasing assets to users and DAV token holders when price
                    targets are met.
                    <br/>
                  </p> */}
                </div>
                {isHome ? (
                  <>
                    <div className={`info-item quick `}>
                      <Link target="_blank" to={Quick_Guide}>
                        <p className="quick-guide">QUICK GUIDE</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <p className="mint-dav-tokens">MINT DAV TOKENS</p>
                    </div>
                    <div
                      className={`info-item info-column column-center second ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      } ${isOnInscription} `}
                    >
                      <Link to={"/inflation-bank"}>
                        <p className="inflation-bank">INFLATION BANK</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-right ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      }`}
                    >
                      <Link to={"/alpharoom"}>
                        <p className="alpha-room">ALPHA ROOM</p>
                      </Link>
                    </div>
                  </>
                ) : isAlpha ? (
                  <>
                    <div className={`info-item quick `}>
                      <Link target="_blank" to={Quick_Guide}>
                        <p className="quick-guide">QUICK GUIDE</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      }`}
                    >
                      <Link to={"/mint"}>
                        <p className="mint-dav-tokens">MINT DAV TOKENS</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-center second ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      }`}
                    >
                      <Link to={"/inflation-bank"}>
                        <p className="inflation-bank">INFLATION BANK</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-right ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <p className="alpha-room">ALPHA ROOM</p>
                    </div>
                  </>
                ) : isInflation ? (
                  <>
                    <div className={`info-item quick `}>
                      <Link target="_blank" to={Quick_Guide}>
                        <p className="quick-guide">QUICK GUIDE</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-center first ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      }`}
                    >
                      <Link to={"/mint"}>
                        <p className="mint-dav-tokens">MINT DAV TOKENS</p>
                      </Link>
                    </div>
                    <div
                      className={`info-item info-column column-center second ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg") ||
                        (theme === "lightTheme" && theme + " translite")
                      }`}
                    >
                      <p className="inflation-bank">INFLATION BANK</p>
                    </div>
                    <div
                      className={`info-item info-column column-right ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      }`}
                    >
                      <Link to={"/alpharoom"}>
                        <p className="alpha-room">ALPHA ROOM</p>
                      </Link>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
              <div style={{ marginBottom: "50px" }}>
                {" "}
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="serachIconLink State searchBar2_small d-flex flex-wrap justify-content-lg-center justify-content-md-start justify-content-sm-start"
                >
                  <div className="under-state">
                    <img
                      src={SystemStateLogo}
                      alt="SystemStateLogo"
                      className="SystemStateLogo"
                    />
                  </div>
                  <p className="state-dex-txt">System State</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="future-box"></div>
      </div>
    </>
  );
}
