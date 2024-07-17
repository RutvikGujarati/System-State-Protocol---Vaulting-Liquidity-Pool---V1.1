import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Index from "./pages/Landing Page/Index";
import Alpha from "./pages/Landing Page/alpha";
import Inflation from "./pages/Landing Page/inflation";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudMoon, faGasPump, faMoon, faSun, fas } from '@fortawesome/free-solid-svg-icons';
import MetaMaskConnect from "./Utils/MetamaskConnect"
import Website from "./Website/Website";
import Functions from "./Utils/Functions";
import Layout from "./Protected Route/Layout";
import PLS from "./pages/Landing Page/PLS";
import XEN from "./pages/Landing Page/XEN";
import FunctionsPLS from "./Utils/functions_PLS";
import SumOfRatioTargets  from "./context/ratiotargetsum";
// import XenTrackingContext  from "./pages/XENTracking/XENTracking";


library.add(fas, faGasPump, faSun, faMoon, faCloudMoon);

export const themeContext = createContext();

function App() {
  const [themeMode, setThemeMode] = useState(localStorage.getItem('theme') || 'light');
  const lightTheme = themeMode === 'light' && 'lightTheme';
  const darkTheme = themeMode === 'dark' && 'darkTheme';
  const dimTheme = themeMode === 'dim' && 'dimTheme';
  const theme = lightTheme || darkTheme || dimTheme;

  const navigate = useNavigate();
  const navigateToDEX = async () => {
    navigate('/mint');
  };
  const navigateToPLS = async () => {
    navigate('/inflation-bank-PLS');
  };
  const navigateToXEN = async () => {
    navigate('/inflation-bank-XEN');
  };

  const navigateToDocs = async () => {
    navigate('/');
  };

  useEffect(() => { }, [theme, setThemeMode]);

  return (
    <>
      <themeContext.Provider value={{ theme, themeMode, setThemeMode, navigateToDEX, navigateToPLS, navigateToXEN, navigateToDocs }}>
        <MetaMaskConnect>

          <Functions>
            <FunctionsPLS>
              {/* <SumOfRatioTargets> */}
              {/* <XenTrackingContext> */}
                <Routes>
                  <Route index element={<Website />} />
                  <Route path="/" element={<Layout />}>
                    <Route path="/mint" element={<Index />} />
                    {/* <Route path="/alpharoom" element={<Alpha />} /> */}
                    <Route path="/inflation-bank-PLS" element={<PLS />} />
                    <Route path="/inflation-bank-XEN" element={<XEN />} />
                  </Route>
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              {/* </XenTrackingContext> */}
              {/* </SumOfRatioTargets> */}
            </FunctionsPLS>
          </Functions>

        </MetaMaskConnect>
      </themeContext.Provider>
    </>
  );
}

export default App;
