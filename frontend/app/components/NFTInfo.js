import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/app/utils/assets/GlobalContext/AppProvider";

const NFTInfo = ({ reload }) => {
  const { monkeyNFT, account } = useContext(AppContext);
  const [totalSupply, setTotalSupply] = useState("-");
  const [yourNFT, setYourNFT] = useState("-");

  useEffect(() => {
    const initialData = async () => {
      if (monkeyNFT) {
        try {
          const totalSupply = await monkeyNFT.totalSupply();
          const yourNFT = await monkeyNFT.mintedWallet(account);
          setYourNFT(yourNFT.toString());
          setTotalSupply(totalSupply.toString());
        } catch (error) {
          console.log(error.message);
        }
      } else {
        toast.warn("Not Connceted!!");
      }
    };
    account && initialData();
  }, [account, monkeyNFT, reload]);
  return (
    <div>
      <h3 className="text-3xl font-bold">
        Total minted NFT's are {totalSupply}/2000
      </h3>
      <h3 className="text-2xl font-bold mt-3">
        You have minted {yourNFT} NFT's
      </h3>
    </div>
  );
};

export default NFTInfo;
