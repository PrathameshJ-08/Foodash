import React, { useState } from "react";
import { useSelector } from "react-redux";

import useMenuList from "../../../utils/hooks/useMenuList";
import useScrollToTopOnMount from "../../../utils/hooks/useScrollToTop";
import MenuCategory from "./MenuCategory";
import NestedCategory from "./NestedCategory";
import Cart from "../Cart";
import Offers from "./Offers";

import { RESTAURANT_IMG_URL } from "../../../utils/constants";
import ResMenuShimmer from "../../../assets/Shimmer/ResMenuShimmer";
import { PiCookingPotBold } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { FaArrowUp } from "react-icons/fa";

const MenuList = () => {
  useScrollToTopOnMount();
  const resInfo = useMenuList();

  const [openCategory, setOpenCategory] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const cartItems = useSelector((store) => store.cart.items) || [];

  if (resInfo === null) return <ResMenuShimmer />;
  const offer =
    resInfo.data.cards[3].card.card.gridElements.infoWithStyle.offers;

  console.log(resInfo);

  const {
    id,
    name,
    cuisines,
    costForTwo,
    cloudinaryImageId,
    avgRating,
    sla,
    totalRatingsString,
    areaName,
    locality,
  } = resInfo?.data?.cards[2]?.card?.card?.info;

  const regularCards =
    resInfo?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = regularCards?.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  const nestedCategories = regularCards?.filter(
    (c) =>
      c?.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
  );

  const toggleCategory = (categoryIndex) => {
    setOpenCategory(openCategory === categoryIndex ? null : categoryIndex);
  };

  const handleCartToggle = () => {
    setShowCart(!showCart);
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      card: {
        ...category.card,
        card: {
          ...category.card.card,
          itemCards: category.card.card.itemCards.filter((item) =>
            item.card.info.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          ),
        },
      },
    }))
    .filter((category) => category.card.card.itemCards.length > 0);

  const filteredNestedCategories = nestedCategories
    .map((category2) => ({
      ...category2,
      card: {
        ...category2.card,
        card: {
          ...category2.card.card,
          categories: category2.card.card.categories.map((nestedCategory) => ({
            ...nestedCategory,
            itemCards: nestedCategory.itemCards.filter((item) =>
              item.card.info.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ),
          })),
        },
      },
    }))
    .filter((category2) =>
      category2.card.card.categories.some(
        (nestedCategory) => nestedCategory.itemCards.length > 0
      )
    );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const hasItem = () => {
    return cartItems.length > 0;
  };

  const img = RESTAURANT_IMG_URL + cloudinaryImageId;

  const rinfo = resInfo?.data?.cards[2]?.card?.card?.info;

  return (
    <>
      <div className="flex flex-col">
        <div className="flex sm:flex-row flex-col items-center text-center sm:text-start sm:items-stretch bg-gradient-to-tr from-slate-950 via-cyan-800 to-teal-500 xl:mb-0 sm:mb-[-1.5rem] p-5 xl:p-10 py-16 -mt-10 md:mt-0 h-[322px]">
          <img
            className="rounded-2xl xl:mb-0  xl:flex-shrink-0 w-96 sm:self-center md:self-start"
            src={img}
            alt={name}
          />
          <div className="grid gap-5 sm:gap-0 ">
            <h1 className="grid text-4xl font-bold text-slate-200 xl:px-8 sm:px-4 pt-5">
              {name}
              <span className="text-base font-extralight sm:mt-[-1rem]">
                <i className="fas fa-map-marker-alt text-yellow-500 mr-2" />
                {locality}, {areaName}
              </span>
            </h1>
            <p className=" text-slate-200  text-sm sm:px-10 xl:px-8 ">
              {cuisines.join(", ")}
            </p>

            <div className="text-slate-200 flex h-12 items-center justify-center">
              <div className=" grid border-r-2 border-l-2 xl:px-8 sm:px-4 xl:text-base sm:text-xs p-2 sm:p-0 ">
                <span className="font-bold">
                  <i className="fa-sharp fa-solid fa-star" />
                  {avgRating % 1 === 0 ? avgRating + ".0" : avgRating}
                </span>
                <span>{totalRatingsString}</span>
              </div>
              <div className="grid border-r-2 xl:px-8 sm:px-2 xl:text-base sm:text-xs sm:ml-3  p-2 sm:p-0">
                <span className="font-bold">₹{costForTwo / 100}/-</span>
                <span>Cost for Two</span>
              </div>
              <div className="grid border-r-2 xl:px-8 sm:px-2 xl:text-base sm:text-xs sm:ml-3  p-2 sm:p-0">
                <span className="font-bold">{sla.deliveryTime} MINS</span>
                <span>Delivery Time</span>
              </div>
            </div>
          </div>
        </div>

        {hasItem() && (
          <span className="z-50 fixed text-white font-extrabold text-xs bg-amber-600 rounded-full w-4 text-center right-14 bottom-10">
            {totalQuantity}
          </span>
        )}

        <button
          className={`z-40 rounded-full fixed p-2 text-white bg-teal-500 bottom-5 right-6 text-2xl 
        }`}
          onClick={handleCartToggle}
        >
          {showCart === false ? <PiCookingPotBold /> : <RxCross2 />}
        </button>
        {showCart && (
          <>
            <div className="fixed right-5 bottom-5 shadow-lg z-30">
              <Cart from={"menu"} />
            </div>
          </>
        )}
        <div className="mt-8 xl:mt-8 sm:mt-14 ">
          <div className="relative -mt-[55px] mb-5   text-center">
            <input
              type="text"
              placeholder="Search Menu Items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className=" px-4 py-2 border-2 border-blue-950 rounded-2xl bg-teal-100 focus:outline-none focus:border-teal-500"
            />
            <button className="absolute  text-xl top-0 mt-1 -ml-10 text-teal-500">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div>
            <Offers offers={offer} />
          </div>
          {filteredCategories.map((category, index) => (
            <MenuCategory
              key={category.card.card.title}
              data={category.card.card}
              showItems={index === openCategory}
              setShowIndex={() => toggleCategory(index)}
              rinfo={rinfo}
            />
          ))}

          {filteredNestedCategories.map((category2, index) => (
            <NestedCategory
              key={category2.card.card.title}
              data2={category2.card.card}
              rinfo={rinfo}
            />
          ))}
        </div>
        <button
          className={`z-40 fixed ${
            showCart ? "bottom-5 right-20" : "bottom-20 right-[26px]"
          } bg-amber-500 hover:bg-amber-700 text-white font-bold text-2xl p-2 rounded-full`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaArrowUp />
        </button>
      </div>
    </>
  );
};

export default MenuList;
