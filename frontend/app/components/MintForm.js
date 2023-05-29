import React from "react";

const MintForm = ({ mintFunction, quantity, setQuantity, button }) => {
  return (
    <form
      action=""
      className="flex flex-col min-w-[30%]"
      onSubmit={mintFunction}
    >
      <label htmlFor="quantity" className="text-lg">
        Quantity
      </label>
      <input
        className="border-2 border-purple-600 px-2 py-1 mt-2 rounded-sm"
        type="number"
        min="1"
        max="3"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button
        type="submit"
        className="text-lg px-6 py-2 bg-purple-700 rounded-md text-white mt-2 hover:bg-purple-500 "
      >
        {button}
      </button>
    </form>
  );
};

export default MintForm;
