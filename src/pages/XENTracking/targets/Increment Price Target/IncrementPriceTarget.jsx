import React, { useContext, useEffect, useState } from "react";
import "./IncrementPriceTarget.css";
import { themeContext } from "../../../../App";
import "../../../../Utils/Theme.css";
import { Web3WalletContext } from "../../../../Utils/MetamaskConnect";
import { functionsContext } from "../../../../Utils/Functions";
import { SumOfRatioTargets } from "../../../../context/ratiotargetsum";
import { Contract, ethers } from "ethers";
import TVL from "../../../../Components/TVL";
import Autovault from "../../../../Components/Autovault";
import ContractAddress from "../../../../Components/ContractAddress";
import TotalTokens from "../../../../Components/TotalTokens";

export default function IncrementPriceTargetXEN() {
  const { theme } = useContext(themeContext);
  // const {totalSUm} = useContext(SumOfRatioTargets);
  const shadow =
    (theme === "lightTheme" && "lightSh") ||
    (theme === "dimTheme" && "dimSh") ||
    (theme === "darkTheme" && "darkSh");
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
  const { accountAddress, currencyName, userConnected } =
    useContext(Web3WalletContext);
  const { socket, getPrice, getIncrementPriceTargets, getDepositors } =
    useContext(functionsContext);
  const [price, setPrice] = useState("0");
  const [incrementPriceTargets, setIncrementPriceTargets] = useState([]);
  const [seeFullPage, setSeeFullPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredArray, setFilteredArray] = useState([]);
  const itemsPerPage = 25;

  const fetchPrice = async () => {
    try {
      let price = await getPrice();
      let formattedPrice = ethers.utils.formatEther(price || "0");
      setPrice(formattedPrice);
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    if (userConnected) {
      fetchPrice();
    }
  });

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
            className={`box-titles2 mx-3 ${theme === "darkTheme" && ""} `}
            id={``}
          >
            <h1
              className={`box-title mb-3 ${
                (theme === "darkTheme" && "bg-dark" && "text-white") ||
                (theme === "dimTheme" && "title-color")
              }`}
            >
              {/* Increment Price Target (iPT) Escrow Vaults */}
            </h1>
          </div>
          <div
            className={`${
              seeFullPage ? "seenFullContent" : ""
            } reponsive-box1 `}
          >
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
                    <>$ {price + " XEN"}</>
                  </span>
                </div>
              </div>
            </div>
            <TVL />
            <Autovault />
          <ContractAddress />
          <TotalTokens />
          </div>
          <div className="view-main">
            <div
              className={`view-pageIncre  ${
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
