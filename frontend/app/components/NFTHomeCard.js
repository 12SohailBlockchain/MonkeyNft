import React, { useState } from "react";
import Image from "next/image";

const NFTHomeCard = ({ isListed, clickFunction, tokenId, image }) => {
  const [listPrice, setListPrice] = useState("0.01");

  const submitButton = (listPrice) => {
    clickFunction(listPrice);
  };
  return (
    <div className="w-1/5 h-auto">
      <Image width={300} height={300} src={image} alt="Picture of the author" />
      <p className="bg-purple-500 text-white">Token ID: {tokenId}</p>
      <p>Owner: You</p>
      <input
        className="w-full border-2 border-purple-500 px-1"
        type="number"
        step="0.01"
        min="0.01"
        disabled={isListed ? true : false}
        value={listPrice}
        onChange={(e) => setListPrice(e.target.value)}
      />
      <button
        className="bg-purple-500 w-full py-1 text-white"
        onClick={() => submitButton(listPrice)}
      >
        {isListed ? "Listed for sale" : "List Now"}
      </button>
    </div>
  );
};

export default NFTHomeCard;
