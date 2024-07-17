import React, { createContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

export const Web3WalletContext = createContext();

export default function MetamaskConnect({ children }) {
  const [userConnected, setUserConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(ethers.constants.AddressZero);
  const [walletBalance, setWalletBalance] = useState('0');
  const [networkName, setNetworkName] = useState('');
  const [currencyName, setCurrencyName] = useState('');

  const connectMetamask = useCallback(async () => {
    if (typeof window?.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const networkVersion = window.ethereum.networkVersion;
        
        if (['943', '80002', '11155111', '5', '69', '80001'].includes(networkVersion)) {
          setAccountAddress(accounts[0]);
          setUserConnected(true);
          await updateWalletInfo(accounts[0]);
        } else {
          alert("Connect to Pulsechain");
        }
      } catch (error) {
        if (error.code === -32002) {
          alert('Please manually connect to MetaMask');
        }
        console.error(error);
      }
    }
  }, []);

  const disconnectUser = () => {
    setAccountAddress(ethers.constants.AddressZero);
    setUserConnected(false);
    setNetworkName('');
    setWalletBalance('0');
    setCurrencyName('');
  };

  const updateWalletInfo = useCallback(async (account) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest']
      });

      const formattedBalance = ethers.utils.formatEther(balance || '0');
      const networkVersion = window.ethereum.networkVersion;

      switch (networkVersion) {
        case '80001':
        case '80002':
          setNetworkName('Polygon Mumbai');
          setCurrencyName('MATIC');
          break;
        case '5':
          setNetworkName('Goerli Testnet');
          setCurrencyName('ETH');
          break;
        case '11155111':
          setNetworkName('Sepolia Testnet');
          setCurrencyName('ETH');
          break;
        case '1':
          setNetworkName('Ethereum Mainnet');
          setCurrencyName('ETH');
          break;
        case '943':
          setNetworkName('Pulsechain Testnet');
          setCurrencyName('PLS');
          break;
        default:
          setNetworkName('Unknown Network');
          setCurrencyName('UNKNOWN');
      }

      setWalletBalance(formattedBalance);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  }, []);

  useEffect(() => {
    if (userConnected && accountAddress !== ethers.constants.AddressZero) {
      updateWalletInfo(accountAddress);
    }
  }, [userConnected, accountAddress, updateWalletInfo]);

  return (
    <Web3WalletContext.Provider value={{
      userConnected,
      accountAddress,
      walletBalance,
      networkName,
      currencyName,
      connectMetamask,
      disconnectUser,
    }}>
      {children}
    </Web3WalletContext.Provider>
  );
}
