import React, { useContext, useState, useEffect, createContext } from "react";
import Searchbar from "../../Components/SearchBar/Searchbar";
import RatioPriceTargets from "../PLSTracking/targets/Ratio Price Targets/RatioPriceTargets";
import IncrementPriceTarget from "../PLSTracking/targets/Increment Price Target/IncrementPriceTarget";
import DAV from "../bottom/dav";
import "./Style.css";
import { themeContext } from "../../App";
import "../../Utils/Theme.css";
import TrackingPage from "../../Components/Tracker/TrackingPage";
import Layout from "../../Protected Route/Layout";

export const themeC = createContext();

export default function Alpha() {

    const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');
    const lightTheme = themeMode === 'light' && 'lightTheme';
    const darkTheme = themeMode === 'dark' && 'darkTheme';
    const dimTheme = themeMode === 'dim' && 'dimTheme';
    const theme = lightTheme || darkTheme || dimTheme;

    useEffect(() => { }, [theme, setThemeMode]);

    const pageStyle = {
        backgroundColor: theme === "dimTheme" ? "#141f35" : theme === "dimTheme" ? "#555" : "#fff",
        color: theme === "darkTheme" || theme === "dimTheme" ? "#fff" : "#000",
        minHeight: "100vh",
    };


    return (
        <themeC.Provider value={{ theme, themeMode }}>
            <div >
                <Searchbar />
                <TrackingPage />

            </div>
        </themeC.Provider>
    );
}
