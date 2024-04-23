import React from "react";
import { HeaderImg, Logo } from "./images";

const HomeImage = () => {
  return (
    <div className="lg:hidden">
      <div className="absolute w-24 p-4">
        <Logo />
      </div>
      <HeaderImg />
    </div>
  );
};

export default HomeImage;
