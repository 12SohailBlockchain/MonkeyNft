"use client";
import React, { useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { AppContext } from "@/app/utils/assets/GlobalContext/AppProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeroSection from "./components/HeroSection";
import MintForm from "./components/MintForm";
import NFTInfo from "./components/NFTInfo";
import NFTHomeCard from "./components/NFTHomeCard";

const HomePage = () => {
  const { monkeyNFT, account } = useContext(AppContext);
  const [publicQuantity, setPublicQuantity] = useState("1");
  const [whiteListQuantity, setWhiteListQuantity] = useState("1");
  const [yourNFT, setYourNFT] = useState([]);
  const [image, setImage] = useState([]);
  const [NFTCount, setNFTCount] = useState();
  const [reload, setReload] = useState(false);

  const publicMintNFT = async (e) => {
    e.preventDefault();
    if (monkeyNFT) {
      try {
        const value = 0.01 * publicQuantity;
        const tx = await monkeyNFT.publicMint(publicQuantity, {
          value: ethers.utils.parseEther(value.toString()),
        });
        toast.warn("Please wait...");
        await tx.wait();
        setReload(!reload);
        toast.success("Mint Successful!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Not Connected!!");
    }
  };
  const WhiteListMintNFT = async (e) => {
    e.preventDefault();
    if (monkeyNFT) {
      try {
        const value = 0.001 * whiteListQuantity;
        const tx = await monkeyNFT.whiteListMint(whiteListQuantity, {
          value: ethers.utils.parseEther(value.toString()),
        });
        toast.warn("Please wait...");
        await tx.wait();
        setReload(!reload);
        toast.success("Mint Successful!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Not Connected!!");
    }
  };

  const listYourNFTs = async (tokenId, listPrice) => {
    if (monkeyNFT) {
      try {
        const yourListPrice = ethers.utils.parseEther(listPrice);
        const marketPlaceFee = 0.01;
        const tx = await monkeyNFT.listNFT(tokenId, yourListPrice, {
          value: ethers.utils.parseEther(marketPlaceFee.toString()),
        });
        toast.warn("Please wait...");
        await tx.wait();
        setReload(!reload);
        toast.success("Listed Sucessfully!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Not Connected!!");
    }
  };

  useEffect(() => {
    const noOfNFTs = async () => {
      if (monkeyNFT) {
        try {
          const nftCount = await monkeyNFT.balanceOf(account);
          setNFTCount(nftCount);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Not Connected!!");
      }
    };

    const getMyNFTs = async () => {
      if (monkeyNFT) {
        try {
          let list = [];
          let imageList = [];
          const totalSupply = await monkeyNFT.totalSupply();
          for (let i = 1; i <= totalSupply.toNumber(); i++) {
            const item = await monkeyNFT.mintedNFTs(i);

            if (item.owner.toLowerCase() == account) {
              const tokenURI = await monkeyNFT.tokenURI(i);
              const response = await axios.get(tokenURI);
              const imagePath = response.data.image;
              const imageCID = imagePath.slice(7, 70);
              const image = await axios.get(`https://ipfs.io/ipfs/${imageCID}`);
              list.push(item);
              imageList.push(image.config.url);
            }
          }
          setImage(imageList);
          setYourNFT(list);
        } catch (err) {
          console.error(err.message);
        }
      } else {
        console.log("not connected!");
      }
    };
    account && noOfNFTs();
    account && getMyNFTs();
  }, [monkeyNFT, account, reload]);

  return (
    <>
      <HeroSection />

      <div className="grid grid-cols-2 w-[90%] mx-auto my-8">
        <NFTInfo reload={reload} />
        <div>
          <h3 className="text-2xl font-bold text-center"> Mint your NFT's</h3>
          <div className="flex justify-around my-4">
            <MintForm
              mintFunction={publicMintNFT}
              quantity={publicQuantity}
              setQuantity={setPublicQuantity}
              button={"Public Mint"}
            />
            <MintForm
              mintFunction={WhiteListMintNFT}
              quantity={whiteListQuantity}
              setQuantity={setWhiteListQuantity}
              button={"WhiteList Mint"}
            />
          </div>
        </div>
      </div>

      <div className="w-[90%] mx-auto py-10 ">
        <h2 className="text-2xl font-bold text-center">Your NFTs</h2>
        <div className="mt-4 text-center flex space-x-10 justify-center">
          {NFTCount > 0
            ? yourNFT.length > 0
              ? yourNFT.map((e, index) => {
                  return (
                    <NFTHomeCard
                      key={index}
                      image={image[index]}
                      tokenId={e.tokenId.toNumber()}
                      isListed={e.isListed}
                      clickFunction={(listPrice) =>
                        listYourNFTs(e.tokenId, listPrice)
                      }
                    />
                  );
                })
              : "Loading..."
            : "No NFTs found in your account. You can mint or buy."}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default HomePage;
