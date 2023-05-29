"use client";
import { AppContext } from "@/app/utils/assets/GlobalContext/AppProvider";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  const { connectWallet, account, monkeyNFT } = useContext(AppContext);
  return (
    <header className="bg-purple-400 py-3">
      <nav className="flex justify-between items-center w-[90%] mx-auto">
        <div>
          <Link href="/">
            <h1 className="font-bold text-3xl">MonkeyNFT</h1>
          </Link>
        </div>
        <div>
          <ul className="flex items-center space-x-14 text-lg font-bold">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link href="/team">Our Team</Link>
            </li>
          </ul>
        </div>
        <div>
          <button
            className="text-lg px-4 py-1 rounded-lg border-2 border-black font-bold hover:bg-purple-600"
            onClick={connectWallet}
          >
            {account
              ? `${account.substring(0, 7)}...${account.substring(38)} `
              : "Connect Wallet"}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
