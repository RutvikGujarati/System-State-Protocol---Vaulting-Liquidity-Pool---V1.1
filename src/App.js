import React, { createContext, useEffect, useState } from "react";
import Layout from "./Protected Route/Layout";
import { Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Landing Page/Index";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCloudMoon, faGasPump, faMoon, faSun, fas } from '@fortawesome/free-solid-svg-icons';
import MetamskConnect from "./Utils/MetamskConnect";
import Website from "./Website/Website";
import Functions from "./Utils/Functions";

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
    navigate('/vlp');
  };

  const navigateToDocs = async () => {
    navigate('/');
  };

  useEffect(() => { }, [theme, setThemeMode]);

  return (
    <>
      <themeContext.Provider value={{ theme, themeMode, setThemeMode, navigateToDEX, navigateToDocs }}>
        <MetamskConnect>
          <Functions>
            <Routes>
              <Route index element={<Website />} />

              <Route path="/vlp" element={<Index />} />

            </Routes>
          </Functions>
        </MetamskConnect>
      </themeContext.Provider>
    </>
  );
}

export default App;
