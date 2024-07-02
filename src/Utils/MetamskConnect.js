import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

export const Web3WalletContext = createContext();

export default function MetamskConnect({ children }) {
  const [userConnected, setUserConnected] = useState(false);
  const [accountAddress, setAccountAddress] = useState(ethers.constants.AddressZero);
  const [walletBalance, setWalletBalance] = useState('0');
  const [networkName, setNetworkName] = useState('');
  const [currencyName, setCurrencyName] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('networkChanged', handleNetworkChanged);

      // Check if already connected
      checkIfAlreadyConnected();
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('networkChanged', handleNetworkChanged);
      }
    };
  }, []);

  const checkIfAlreadyConnected = async () => {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setAccountAddress(accounts[0]);
        setUserConnected(true);
        getMetamaskBalance(accounts[0]);
        setNetworkName(getNetworkName(window.ethereum.networkVersion));
        setCurrencyName(getCurrencySymbol(window.ethereum.networkVersion));
      }
    } catch (error) {
      console.error('Error checking MetaMask connection:', error);
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectUser();
    } else {
      setAccountAddress(accounts[0]);
      getMetamaskBalance(accounts[0]);
    }
  };

  const handleNetworkChanged = (networkId) => {
    setNetworkName(getNetworkName(networkId));
    getMetamaskBalance(accountAddress);
  };

  const getNetworkName = (networkId) => {
    switch (networkId) {
      case '80001':
      case '80002':
        return 'Polygon Mumbai';
      case '5':
        return 'Goerli Testnet';
      case '11155111':
        return 'Sepolia Testnet';
      case '1':
        return 'Ethereum Mainnet';
      case '943':
        return 'Pulsechain Testnet';
      case '369':
        return 'Pulsechain mainnet';
      default:
        return 'Unknown Network';
    }
  };

  const ProvidermetamaskLogin = async () => {
    if (loading) return; // Prevent multiple requests

    if (typeof window.ethereum !== 'undefined') {
      setLoading(true); // Set loading state to true
      try {
        const response = await getMetamaskAccount();
        if (response) {
          setUserConnected(true);
          setAccountAddress(response);
          getMetamaskBalance(response);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Reset loading state
      }
    }
  };

  const disconnectUser = async () => {
    setAccountAddress('');
    setUserConnected(false);
    setNetworkName('');
    setWalletBalance('');
    setCurrencyName('');
  };

  const getMetamaskAccount = async () => {
    try {
      const metamaskAccounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const networkId = window.ethereum.networkVersion;
      if (['943','369', '80002', '11155111', '5', '80001'].includes(networkId)) {
        return metamaskAccounts[0];
      } else {
        alert('Connect to Mumbai, Sepolia, Pulsechain');
        throw new Error('Connect to Mumbai Network');
      }
    } catch (error) {
      console.error(error);
      if (error.code === -32002) {
        alert('Please manually connect to MetaMask');
      }
    }
  };

  const getMetamaskBalance = async (address) => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      });
      const formattedBalance = ethers.utils.formatEther(balance || '0');
      const networkId = window.ethereum.networkVersion;
      setWalletBalance(formattedBalance);
      setNetworkName(getNetworkName(networkId));
      setCurrencyName(getCurrencySymbol(networkId));
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrencySymbol = (networkId) => {
    switch (networkId) {
      case '80001':
      case '80002':
        return 'MATIC';
      case '5':
      case '11155111':
      case '1':
        return 'ETH';
      case '943':
        return 'PLS';
      case '369':
        return 'PLS';
      default:
        return 'ETH';
    }
  };

  return (
    <Web3WalletContext.Provider value={{
      userConnected,
      accountAddress,
      networkName,
      walletBalance,
      currencyName,
      ProvidermetamaskLogin,
      disconnectUser,
      getMetamaskAccount,
    }}>
      {children}
    </Web3WalletContext.Provider>
  );
}
