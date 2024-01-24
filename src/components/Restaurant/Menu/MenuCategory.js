import React, { useState } from "react";
import Accordion from "./Accordion";

const MenuCategory = (props) => {
  const { data, showItems, setShowIndex, rinfo } = props;

  const handleToggle = () => {
    setShowIndex();
  };

  return (
    <Accordion
      data={data}
      isOpen={showItems}
      onToggle={handleToggle}
      rinfo={rinfo}
    />
  );
};

export default MenuCategory;
