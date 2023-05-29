"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "@/app/utils/assets/GlobalContext/AppProvider";
import { toast } from "react-toastify";
import NFTMarketplaceCard from "../components/NFTMarketplaceCard";

const MarketPage = () => {
  const { monkeyNFT, account } = useContext(AppContext);
  const [listedNFTs, setListedNFTs] = useState([]);
  const [image, setImage] = useState([]);
  const [reload, setReload] = useState(false);

  const buyNFT = async (id, listPrice, tokenId) => {
    if (monkeyNFT) {
      try {
        const tx = await monkeyNFT.buyNFT(id, {
          value: listPrice.toString(),
        });
        toast.warn("Please wait...");
        await tx.wait();
        setReload(!reload);
        toast.success(`Purchase Successful! Your tokenId is: ${tokenId}`);
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.warn("Not Connected!");
    }
  };

  useEffect(() => {
    const getListedNFTs = async () => {
      if (monkeyNFT) {
        try {
          let list = [];
          let imageList = [];
          const length = await monkeyNFT.getListedNFTLength();
          for (let i = 0; i < length.toNumber(); i++) {
            const item = await monkeyNFT.allListedNFTs(i);
            const tokenId = item.tokenId.toNumber();

            const tokenURI = await monkeyNFT.tokenURI(tokenId);
            const response = await axios.get(tokenURI);
            const imagePath = response.data.image;
            const imageCID = imagePath.slice(7, 70);
            const image = await axios.get(`https://ipfs.io/ipfs/${imageCID}`);
            imageList.push(image.config.url);
            list.push(item);
          }
          setImage(imageList);
          setListedNFTs(list);
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.log("not connected!");
      }
    };
    account && getListedNFTs();
  }, [monkeyNFT, account, reload]);

  return (
    <div className="w-[90%] mx-auto py-10 ">
      <h2 className="text-2xl font-semibold text-center">Listed NFTs</h2>
      <div className="mt-4 text-center grid grid-cols-5 gap-7 justify-center">
        {listedNFTs.length > 0 ? (
          listedNFTs.map((e, index) => {
            return (
              <NFTMarketplaceCard
                key={index}
                image={image[index]}
                tokenId={e.tokenId.toNumber()}
                button={e.isListed}
                owner={e.owner}
                listPrice={e.listPrice}
                clickFunction={() => buyNFT(index, e.listPrice, e.tokenId)}
              />
            );
          })
        ) : (
          <p className="font-bold">Loading....</p>
        )}
      </div>
    </div>
  );
};

export default MarketPage;
