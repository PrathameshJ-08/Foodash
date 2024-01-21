import React from "react";
import { EmptyCartImage } from "./images";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center text-center items-center h-screen">
      <EmptyCartImage height="h-96" />

      <p className="text-blue-500 font-extrabold text-2xl mb-2">
        Your cart is empty
      </p>
      <p className="mb-4">
        You can go to the home page to view more restaurants.
      </p>

      <Link to="/rlist">
        <button className="bg-gradient-to-r from-teal-500 to-lime-500 hover:from-teal-400 hover:to-lime-400 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out">
          Back To Home
        </button>
      </Link>
    </div>
  );
};

export default EmptyCart;
