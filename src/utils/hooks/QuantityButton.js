import React from "react";

const QuantityButton = ({ itemId, quantity, onDecrease, onIncrease }) => {
  return (
    <div className="flex items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-md justify-between border-[1px] border-green-400 overflow-hidden h-[25.6px] w-[75px]">
      <button
        className="px-1 rounded-md bg-white text-2xl text-amber-500 font-semibold active:bg-amber-100 active:text-amber-700 hover:bg-slate-100 -mt-1"
        onClick={() => onDecrease(itemId)}
      >
        &#8722;
      </button>
      <span className="tex-lg font-semibold text-green-500">{quantity}</span>
      <button
        className="px-1 rounded-md bg-white text-2xl text-green-400 font-bold active:bg-green-200 active:text-green-700 hover:bg-slate-100 -mt-1"
        onClick={() => onIncrease(itemId)}
      >
        &#43;
      </button>
    </div>
  );
};

export default QuantityButton;
