import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);

  

  const checkWalletIsConnected = async () => {
    //@ts-ignore
    if (!window.ethereum) {
      console.log("MetaMask not detected");
      return;
    }
    //@ts-ignore

    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    if (accounts.length) {
      setCurrentAccount(accounts[0]);
    } else {
      console.log("No accounts found");
    }
  };


  const connectWallet = async () => {
        //@ts-ignore

    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
        //@ts-ignore


    try {
            //@ts-ignore

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <div className="wallet-connect">
      {currentAccount ? (
        <div>
          <p>Connected Account: {currentAccount}</p>
        </div>
      ) : (
        <button onClick={connectWallet} className="bg-blue-500 text-white p-2 rounded">
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
