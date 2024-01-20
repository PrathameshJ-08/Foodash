import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} from "../../utils/cartSlice";

const Cart = ({ resInfo }) => {
  const [tip, setTip] = useState("0");
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    setTip("0");
  };

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => {
      const itemCost =
        item.card.info.price / 100 || item.card.info.defaultPrice / 100;
      return total + item.quantity * itemCost;
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

  console.log(resInfo);

  return (
    <div className="w-[366px] mx-auto  rounded-md shadow-md p-4  bg-slate-100 z-50">
      <div className="flex items-center justify-between mb-4">
        <button className="text-green-500 font-semibold">Your Cart</button>
      </div>

      <div className="overflow-y-auto max-h-[300px] mb-4">
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
        <div className="flex justify-between mb-2">
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

export default Cart;
