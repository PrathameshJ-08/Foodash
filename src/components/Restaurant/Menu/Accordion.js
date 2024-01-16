import React from "react";

import MenuItemList from "./MenuItemList";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Accordion = ({ data, isOpen, onToggle }) => {
  const categoryTitle = data.title;
  const itemCount = data.itemCards.length;

  return (
    <div className="px-4 md:px-8 lg:px-16 w-full text-slate-900">
      <div className="md:w-1/2 mx-auto mb-4 bg-white shadow-md p-4 rounded-xl">
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
        {isOpen && <MenuItemList items={data.itemCards} />}
      </div>
    </div>
  );
};

export default Accordion;
