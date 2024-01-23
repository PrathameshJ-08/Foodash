import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Cart from "./Cart";
import { clearCart } from "../../utils/cartSlice";
import useFetchRestaurants from "../../utils/hooks/useFetchRestaurants";
import { useUserContext } from "../../utils/userContext";
import { OrderImg } from "../../assets/images";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const CheckoutPage = () => {
  const [order, setOrder] = useState(false);
  const { user } = useUserContext();
  const { location } = useFetchRestaurants();
  const dispatch = useDispatch();
  const handleOrder = () => {
    dispatch(clearCart());
    setOrder(!order);
  };

  return (
    <>
      {order ? (
        <OrderPage />
      ) : (
        <>
          <div className="flex flex-col-reverse lg:flex-row bg-teal-100 md:mt-24 -mt-8">
            <div className="lg:w-8/12 pt-8 text-md sm:text-xl">
              <div className="bg-zinc-50 rounded-sm md:mx-20 mx-5  mt-5 shadow-lg flex overflow-hidden items-center">
                <div className="text-teal-500 p-5">
                  <AccountCircleIcon />
                </div>
                <span>{user.name ? `${user.name}!` : "Guest"}</span>
              </div>
              <div className="bg-zinc-50 rounded-sm md:mx-20 mx-5 mt-5 shadow-lg flex overflow-hidden items-center">
                <div className="text-teal-500 p-5">
                  <LocationOnIcon />
                </div>
                <span>
                  {location?.address?.suburb + ", "}
                  {location?.address?.city + ", "}
                  {location?.address?.state_district + "- "}
                  {location?.address?.postcode + ", "}{" "}
                  {location?.address?.state}
                </span>
              </div>
              <div className="bg-zinc-50 rounded-sm md:mx-20 mx-5 mt-5 shadow-lg flex overflow-hidden items-center">
                <div className="text-teal-500 p-5">
                  <AccountBalanceWalletIcon />
                </div>
                <span>Payment</span>
              </div>
            </div>
            <div className="lg:w-4/12 pt-12">
              <Cart />
            </div>
          </div>
          <div className="text-center p-12 bg-teal-100">
            <button
              className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-lg px-5 py-2.5 me-2 mb-2  focus:outline-none dark:focus:ring-teal-800"
              onClick={handleOrder}
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </>
  );
};

const OrderPage = () => {
  return (
    <div className="text-center pt-10 h-screen">
      <OrderImg />

      <h2 className="font-bold text-2xl text-sky-600 animate-pulse">
        Order placed successfully
      </h2>
      <Link to="/rlist">
        <button className="text-white bg-teal-500 hover:bg-teal-800 focus:ring-4 focus:ring-teal-300 font-medium rounded-lg text-lg  py-2 px-8 me-2 mb-2  focus:outline-none dark:focus:ring-teal-800 mt-5">
          Back to Home
        </button>
      </Link>
    </div>
  );
};
export default CheckoutPage;
