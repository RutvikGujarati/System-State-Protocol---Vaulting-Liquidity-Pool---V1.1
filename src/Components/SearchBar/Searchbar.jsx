import React, { useContext, useEffect, useState } from "react";
import "../../Global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import "./Searchbar.css";
import { Web3WalletContext } from "../../Utils/MetamskConnect";
import { Link, useLocation } from "react-router-dom";
import fistPump from "../../Assets/High-Resolutions-Svg/Updated/fist pump small.svg";
import metamask from "../../Assets/metamask.png";
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
  const isHome = location.pathname == "/Create-Vaults";
  const isVisible = !isHome && "isVisible";

  const [selectedValue, setSelectedValue] = useState("Deposit");
  const [buyTokenSelector, setBuyTokenSelector] = useState("Inscribe");
  const [tokenSelector, setTokenSelector] = useState("Polygon Mumbai");
  const [balance, setBalance] = useState("Enter Amount");
  const [navigateToExplorer, setNavigateToExplorer] = useState("");
  const [toBeClaimed, setToBeClaimed] = useState("0");
  const [claimParityTokens, setClaimParityTokens] = useState("0");
  const [protocolFee, setProtocolFee] = useState("0");
  const [placeHolder, setPlaceHolder] = useState("");
  const [allRewardAmount, setAllRewardAmount] = useState("");
  const [price, setprice] = useState(0);

  const {
    socket,
    handleDeposit,
    getToBeClaimed,
    handle_Claim_IPT_and_RPT,
    handle_Claim_Protocol_Fee,
    handle_Claim_Parity_Tokens,
    handle_Claim_All_Reward_Amount,
    getParityDollarClaimed,
    getFormatEther,
    getProtocolFee,
    getPrice,
  } = useContext(functionsContext);
  const {
    accountAddress,
    networkName,
    userConnected,
    WalletBalance,
    currencyName,
  } = useContext(Web3WalletContext);
  const isHandleDeposit = async (e) => {
    e.preventDefault();
    if (selectedValue === "Deposit") {
      const isSuccess = await handleDeposit(depositAmount);
      if (isSuccess) {
        setSearch("");
      }
    } else if (selectedValue === "Claim IPT & RPT") {
      handle_Claim_IPT_and_RPT(accountAddress);
    } else if (selectedValue === "Claim Parity Tokens") {
      handle_Claim_Parity_Tokens(accountAddress);
    } else if (selectedValue === "Claim Protocol Fee") {
      handle_Claim_Protocol_Fee(accountAddress);
    } else if (selectedValue === "Claim All Reward") {
      handle_Claim_All_Reward_Amount(accountAddress);
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
  const ProtocolFee = async () => {
    try {
      let protocolFee = await getProtocolFee(accountAddress);
      let protocolAmount = await protocolFee?.protocolAmount;
      let fixed = Number(protocolAmount).toFixed(4) + " " + currencyName;
      setProtocolFee(fixed);
    } catch (error) {
      console.error("error:", error);
    }
  };
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

  // Done
  const ToBeClaimed = async () => {
    try {
      let toBeClaimed = await getToBeClaimed(accountAddress);
      let formattedToBeClaimed = ethers.utils.formatEther(
        toBeClaimed ? toBeClaimed : "0"
      );
      let fixed = Number(formattedToBeClaimed).toFixed(4);
      setToBeClaimed(fixed);
    } catch (error) {
      console.log("error:", error);
    }
  };
  const getClaimParityTokens = async () => {
    let ParityShareTokensDetail = await getParityDollarClaimed(accountAddress);
    let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount;
    let parityClaimableAmountFormatted = await getFormatEther(
      parityClaimableAmount
    );
    let fixed = Number(parityClaimableAmountFormatted).toFixed(4);
    setClaimParityTokens(fixed);
  };
  const AllRewardAmount = async () => {
    let userBucketBalance = await getToBeClaimed(accountAddress);
    let formattedToBeClaimed = await getFormatEther(userBucketBalance || "0");

    let ParityShareTokensDetail = await getParityDollarClaimed(accountAddress);
    let parityClaimableAmount = ParityShareTokensDetail?.parityClaimableAmount;
    let parityClaimableAmountFormatted = await getFormatEther(
      parityClaimableAmount
    );

    let protocolFee = await getProtocolFee(accountAddress);
    let protocolAmount = await protocolFee?.protocolAmount;

    let AllFee =
      Number(formattedToBeClaimed) +
      Number(parityClaimableAmountFormatted) +
      Number(protocolAmount);

    let fixed =
      (AllFee.toFixed(4) === "NaN" ? "0" : AllFee.toFixed(4)) +
      " " +
      currencyName;
    setAllRewardAmount(fixed);
  };
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
      ToBeClaimed();
      getClaimParityTokens();
      fetchPrice();
      getPlaceHolder();
      ProtocolFee();
      AllRewardAmount();
    }
  }, [socket]);

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
                    marginLeft: "10px",
                    marginTop: "-30px",
                  }}
                >
                  Vaulting Liquidity Pools (VLP) is the process through which a
                  smart contract employs ratio vaults to mitigate token
                  inflation-erosion and directly create multiple copies of your
                  crypto assets over natural market cycles.
                </div>
                {isHome ? (
                  <>
                    <div
                      className={`search ${theme} ${
                        theme === "lightTheme" && "text-dark"
                      } ${
                        (theme === "darkTheme" && "Theme-block-container") ||
                        (theme === "dimTheme" && "dimThemeBg")
                      }`}
                    >
                      <p
                        className={`m-0 ms-3 tokenSize d-none d-md-block ${
                          block + dark
                        } ${
                          (theme === "lightTheme" && "depositInputLight") ||
                          (theme === "dimTheme" && "depositInputGrey darkColor")
                        } ${
                          theme === "darkTheme" && "depositInputDark darkColor"
                        }`}
                      >
                        {currencyName}&nbsp;<span>(Pulsechain)</span>
                      </p>
                      <form className="w-100 search-form">
                        <input
                          className={`w-75 ms-3 me-4 form-control inputactive ${block} ${
                            (theme === "lightTheme" && "depositInputLight") ||
                            (theme === "dimTheme" &&
                              "depositInputGrey darkColor")
                          } ${
                            theme === "darkTheme" &&
                            "depositInputDark darkColor"
                          }`}
                          pattern={`[0-9,.]*`} // Only allow digits, commas, and dots
                          type="text"
                          disabled={isDashboardInputDisabled}
                          onBlur={handleBlur}
                          value={search}
                          placeholder={placeHolder}
                          onChange={(e) => addCommasAsYouType(e)}
                        />
                        <button
                          disabled={
                            selectedValue === "Deposit" &&
                            (Number(search) <= 0 && search === ""
                              ? true
                              : false)
                          }
                          className={`fist-pump-img first_pump_serchbar ${
                            (theme === "darkTheme" && "firstdumDark") ||
                            (theme === "dimTheme" && "dimThemeBg")
                          } `}
                          onClick={(e) => {
                            isHandleDeposit(e);
                          }}
                        >
                          <img src={fistPump} className="w-100 h-100" />
                        </button>
                      </form>
                    </div>
                    <div
                      className={`box-3 ${
                        (theme === "darkTheme" && "Theme-btn-block") ||
                        (theme === "dimTheme" && "dimThemeBtnBg")
                      }`}
                      style={{marginTop: "10px" }}
                    >
                      <span
                       
                      >
                        {currencyName} PRICE :
                      </span>
                      <span className="mx-1" >
                        $ {price} {""}
                        
                        <span
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                        ></span>
                      </span>
                      <span
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                      ></span>
                    </div>
                  </>
                ) : (
                  <div></div>
                )}
              </div>
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
        <div className="future-box"></div>
      </div>
    </>
  );
}
