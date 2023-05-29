import React from "react";
import Image from "next/image";
import { ethers } from "ethers";

const NFTMarketplaceCard = ({
  button,
  clickFunction,
  tokenId,
  image,
  owner,
  listPrice,
}) => {
  return (
    <div className="w-full h-auto">
      <Image width={300} height={300} src={image} alt="Picture of the author" />
      <p>Token ID: {tokenId}</p>
      <p className="bg-purple-500 text-white">
        Price: {ethers.utils.formatEther(listPrice)} MATIC
      </p>
      <p>
        Owner: {owner.toLowerCase().substring(0, 7)}...
        {owner.toLowerCase().substring(38)}
      </p>
      <button
        className="bg-purple-500 w-full py-1 text-white font-bold"
        onClick={clickFunction}
      >
        {button ? "Buy Now" : "Sold Out"}
      </button>
    </div>
  );
};

export default NFTMarketplaceCard;
