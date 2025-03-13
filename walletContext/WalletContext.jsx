import React, { createContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setWalletAddress(address);
      console.log("✅ Wallet Connected:", address);
    } else {
      setWalletAddress(""); // Reset when disconnected
    }
  }, [isConnected, address]);
  useEffect(() => {
    console.log("Wallet Connection Status:", isConnected);
    console.log("Wallet Address from Wagmi:", address);
    console.log("Stored Wallet Address in Context:", walletAddress);
  }, [isConnected, address, walletAddress]);
  

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress, balance, setBalance }}>
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
