import React, { useContext, useState, useEffect } from "react";
import { PSD_ADDRESS } from "../Utils/ADDRESSES/Addresses";
import { functionsContext } from "../Utils/Functions";
import { themeContext } from "../App";

const ContractAddress = () => {
  const { theme } = useContext(themeContext);
  const { BalanceOfXenTokenContract } = useContext(functionsContext);
  const [balance, setbalance] = useState("0");
  const textTheme =
    (theme === "darkTheme" && "darkColor") ||
    (theme === "dimTheme" && "text-white");
  const textTitle =
    (theme === "darkTheme" && "darkColorTheme") ||
    (theme === "dimTheme" && "darkColorTheme");
  const spanDarkDim =
    (theme === "darkTheme" && "TrackSpanText") ||
    (theme === "dimTheme" && "TrackSpanText");

  const getbalance = async () => {
    const balanceContract = await BalanceOfXenTokenContract();
    console.log("balance of contract", balanceContract);
    setbalance(balanceContract);
  };

  useEffect(() => {
    getbalance();
  });
  return (
    <>
      <div className="hrp">
        <hr className="my-3 " />
      </div>
      <div className={`varSize ${spanDarkDim}`} style={{ marginLeft: "15px" }}>
        <span className={`spanText ${spanDarkDim} `}>
          {" "}
          <> Contract Balance : {balance}</>
        </span>
      </div>
    </>
  );
};

export default ContractAddress;
