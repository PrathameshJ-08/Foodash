// RestaurantCategory.js
import React, { useState } from "react";
import Accordion from "./Accordion";

const MenuCategory = (props) => {
  const { data, showItems, setShowIndex } = props;

  const handleToggle = () => {
    setShowIndex();
  };

  return <Accordion data={data} isOpen={showItems} onToggle={handleToggle} />;
};

export default MenuCategory;
