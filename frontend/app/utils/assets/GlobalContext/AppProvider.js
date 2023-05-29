"use client";
import { ethers } from "ethers";
import React, { useState, createContext } from "react";
import contractJSON from "./MonkeyNFT.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppContext = createContext();
const contractAddress = "0x796ed75f674B51d34745656f1189f2e3f619ac78";
const contractABI = contractJSON.abi;

const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    account: "",
    monkeyNFT: null,
  });

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const polygonMumbaiChainId = "0x13881";
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: polygonMumbaiChainId }],
        });
        const account = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = await new ethers.providers.Web3Provider(
          window.ethereum
        );
        const signer = await provider.getSigner();
        const monkeyNFT = await new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        setState({
          provider,
          signer,
          account: account[0],
          monkeyNFT,
        });
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Please install Metamask");
    }
  };
  return (
    <>
      <AppContext.Provider value={{ connectWallet, ...state }}>
        {children}
      </AppContext.Provider>
      <ToastContainer />
    </>
  );
};

export default AppProvider;
export { AppContext };
