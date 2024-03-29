import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} from "../../utils/cartSlice";
import { setCartRestaurant, setResDetails } from "../../utils/restaurantSlice";
import { RESTAURANT_IMG_URL } from "../../utils/constants";

const Cart = ({ from }) => {
  const [tip, setTip] = useState("0");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const navigate = useNavigate();

  const handleClearCart = () => {
    dispatch(setCartRestaurant(null));
    dispatch(clearCart());
    setTip("0");
    if (from == "header") {
      navigate("/emptycart");
      dispatch(setResDetails(null));
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify({ items: cartItems }));
  }, [cartItems]);

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      const itemCost =
        item.card.info.price / 100 || item.card.info.defaultPrice / 100;
      const cost = total + item.quantity * itemCost;
      return Math.ceil(cost);
    }, 0);
  };

  const totalDeliveryFee = cartItems.length === 0 ? 0 : 40;
  const totalPlatformFee = cartItems.length === 0 ? 0 : 5;
  const totalGSTAndCharges = cartItems.length === 0 ? 0 : 20;

  const totalBill =
    cartItems.length === 0
      ? 0
      : Math.ceil(
          calculateTotalCost() +
            totalDeliveryFee +
            parseInt(tip) +
            totalPlatformFee +
            totalGSTAndCharges
        );

  // if (from == "menu") {
  //   console.log("menu");
  // } else if (from == "header") {
  //   console.log("header");
  // } else {
  //   console.log("none");
  // }
  return (
    <div className="w-[366px] mx-auto  rounded-md shadow-md p-4  bg-slate-100 z-50 ">
      <Link to="/cart">
        <div className="flex items-center justify-between mb-4">
          <button className="text-green-500 font-semibold">Your Cart</button>
        </div>
      </Link>

      <div className="overflow-y-auto max-h-[200px] mb-4">
        {cartItems.length === 0 ? (
          <div className="justify-center text-center font-extrabold text-amber-500 mb-4">
            Empty Cart
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div key={index} className="flex justify-center mb-2">
              <div className="w-1/6 text-center">
                <i
                  className={`fa-sharp fa-solid fa-circle text-[8px] p-1 ${
                    item.card.info.vegClassifier === "NONVEG" ||
                    item.card.info.isVeg === 1
                      ? "veg text-green-500 border-2 border-green-500"
                      : "nonveg text-red-500 border-2 border-red-500"
                  }`}
                />
              </div>
              <div className="w-4/6">
                <p>{item.card.info.name}</p>
                <div className="flex items-center ">
                  <button
                    className="bg-amber-100 font-bold px-2  rounded-md mr-2"
                    onClick={() => handleDecreaseQuantity(item.card.info.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="bg-green-200 font-bold px-2  rounded-md ml-2"
                    onClick={() => handleIncreaseQuantity(item.card.info.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="w-1/6">
                <p>
                  ₹
                  {Math.floor(
                    item.quantity *
                      (item.card.info.price
                        ? item.card.info.price / 100
                        : item.card.info.defaultPrice / 100)
                  )}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="border-t-2 border-gray-300 py-4">
        <div className="flex justify-between mb-4">
          <span className="font-bold text-xl">
            {cartItems.length === 0
              ? "Total Bill: ₹0"
              : `Total Bill: ₹${totalBill}`}
          </span>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
        </div>
        <div className="flex justify-between mb-2 font-semibold">
          <span>Item Total</span>
          <span>₹{calculateTotalCost()}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee </span>
          <span>{cartItems.length === 0 ? " ₹0" : `₹40.00`}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Tip</span>

          <span>
            <button
              className="font-bold"
              onClick={() => {
                tip <= 0 || setTip(parseInt(tip - 5));
              }}
            >
              -
            </button>{" "}
            ₹
            <input
              className="w-10 text-center bg-slate-200 rounded-full"
              type="text"
              value={tip}
              onChange={(e) => setTip(parseInt(e.target.value))}
            />
            <button
              className="font-bold"
              onClick={() => setTip(parseInt(tip + 5))}
            >
              +
            </button>
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Platform Fee</span>
          <span>{cartItems.length === 0 ? " ₹0" : `₹5.00`}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>GST and Restaurant Charges</span>
          <span>{cartItems.length === 0 ? " ₹0" : `₹20.00`}</span>
        </div>
      </div>
    </div>
  );
};

export const withBackToRes = (Cart) => {
  const dispatch = useDispatch();

  const ResInfo = useSelector((store) => store.restaurant.resDetails);
  const img = ResInfo ? RESTAURANT_IMG_URL + ResInfo.cloudinaryImageId : null;

  const currentCartRestaurant = useSelector(
    (store) => store.restaurant.currentCartRestaurant
  );
  const navigate = useNavigate();
  const handleBackToRes = () => {
    dispatch(setCartRestaurant(ResInfo.id));
    navigate(`/rlist/restaurants/${currentCartRestaurant}`);
  };
  return (props) => {
    return (
      <div className="flex flex-col items-center shadow-md w-[366px] ">
        <div className="flex flex-col items-center shadow-md w-[366px]">
          <div
            className="w-[366px] mx-auto rounded-t-md p-4 pb-2 bg-gray-100 flex items-center -mb-14 space-x-4 z-30 cursor-pointer hover:bg-slate-100"
            onClick={handleBackToRes}
          >
            <img src={img} className="w-28 rounded-md" alt="Product Image" />
            <div className="flex flex-col flex-grow">
              <span className="text-xl font-semibold">{ResInfo.name}</span>
              <span className="text-xs">
                {ResInfo.locality}, {ResInfo.areaName}
              </span>
              <div className="p-1 border-b-2 border-gray-500 w-12"></div>
            </div>
          </div>
        </div>
        <div className="">
          <Cart {...props} from={"header"} />
        </div>
      </div>
    );
  };
};

export default Cart;
