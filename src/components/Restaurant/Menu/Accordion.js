import React, { useState } from "react";
import MenuItemList from "./MenuItemList";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Accordion = ({ data, isOpen, onToggle, rinfo }) => {
  const categoryTitle = data.title;
  const itemCount = data.itemCards.length;

  return (
    <div className="px-4 md:px-28 lg:px-16 w-full text-slate-900">
      <div className="lg:w-1/2 mx-auto mb-4 bg-white shadow-md p-4 rounded-xl">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={onToggle}
        >
          <span className="font-bold text-lg">
            {categoryTitle} ({itemCount})
          </span>
          <span className="hover:cursor-pointer">
            {isOpen ? (
              <KeyboardArrowUpIcon className="text-gray-500" />
            ) : (
              <KeyboardArrowDownIcon className="text-gray-500" />
            )}
          </span>
        </div>
        {isOpen && <MenuItemList items={data.itemCards} rinfo={rinfo} />}
      </div>
    </div>
  );
};

export default Accordion;
