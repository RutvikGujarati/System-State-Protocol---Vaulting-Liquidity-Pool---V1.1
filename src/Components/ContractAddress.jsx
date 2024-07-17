import React, { useContext } from "react";
import { PSD_ADDRESS } from "../Utils/ADDRESSES/Addresses";
import { themeContext } from "../App";

const ContractAddress = () => {
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
  return (
    <>
      <div className="hrp">
        <hr className="my-3 " />
      </div>
      <div className={`varSize ${spanDarkDim}`} style={{ marginLeft: "15px" }}>
        <span className={`spanText ${spanDarkDim} `}>
          {" "}
          <> Contract Address : {PSD_ADDRESS}</>
        </span>
      </div>
    </>
  );
};

export default ContractAddress;
