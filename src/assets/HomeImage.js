import React from "react";
import { HeaderImg, Logo } from "./images";

const HomeImage = () => {
  return (
    <div className="lg:hidden">
      <div className="absolute w-16 py-1 px-2 m-4 bg-slate-50 bg-opacity-80 rounded-full border-2 border-teal-400">
        <Logo />
      </div>
      <HeaderImg />
    </div>
  );
};

export default HomeImage;
