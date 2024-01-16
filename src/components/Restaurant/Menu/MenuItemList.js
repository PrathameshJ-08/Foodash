import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} from "../../../utils/cartSlice";

import { MENU_IMG_API } from "../../../utils/constants";
import QuantityButton from "../../../utils/hooks/QuantityButton";

const MenuItemList = ({ items }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const isItemInCart = (itemId) =>
    cartItems.some((item) => item.card.info.id === itemId);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decreaseItemQuantity(itemId));
  };

  return (
    <>
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-slate-100 items-center border-b-4 border-gray-700 rounded-2xl pl-6 flex py-2 my-5 w-full hover:bg-slate-200"
        >
          <div className="flex-grow w-10/12">
            <i
              className={`fa-sharp fa-solid fa-circle text-[8px] p-1 ${
                item.card.info.vegClassifier === "NONVEG" ||
                item.card.info.isVeg === 1
                  ? "veg text-green-500 border-2 border-green-500"
                  : "nonveg text-red-500 border-2 border-red-500"
              }`}
            />
            <h2 className="sm:text-lg">{item.card.info.name}</h2>
            <p className="text-sm font-semibold underline sm:no-underline">
              ₹
              {item.card.info.price
                ? item.card.info.price / 100
                : item.card.info.defaultPrice / 100}
              /-
            </p>
            <p className="text-xs text-gray-500 h-12 overflow-hidden w-11/12">
              {item.card.info.description}
            </p>
          </div>
          <div className="flex-shrink-0 right-0 relative">
            {item.card.info.imageId ? (
              <div className="relative">
                <img
                  className="w-32 h-32 object-cover rounded-2xl p-2"
                  src={MENU_IMG_API + item.card.info.imageId}
                  alt={item.card.info.name}
                />
                {isItemInCart(item.card.info.id) ? (
                  <QuantityButton
                    itemId={item.card.info.id}
                    quantity={
                      cartItems.find(
                        (cartItem) =>
                          cartItem.card.info.id === item.card.info.id
                      )?.quantity || 0
                    }
                    onDecrease={handleDecreaseQuantity}
                    onIncrease={handleIncreaseQuantity}
                  />
                ) : (
                  <button
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-[1px] border-green-400 px-4 py-1 rounded-md bg-white text-xs text-green-400 font-bold active:bg-green-200 active:text-green-700 hover:bg-slate-100"
                    onClick={() => handleAddToCart(item)}
                  >
                    ADD+
                  </button>
                )}
              </div>
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuItemList;
