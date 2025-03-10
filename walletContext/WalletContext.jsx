import React, { createContext, useState } from "react";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress, balance, setBalance }}>
      {children}
    </WalletContext.Provider>
  );
};
export default WalletProvider