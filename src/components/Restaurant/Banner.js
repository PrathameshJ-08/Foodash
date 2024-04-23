import React, { useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import useFetchRestaurants from "../../utils/hooks/useFetchRestaurants";

const Banner = () => {
  const { banner } = useFetchRestaurants();
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = container.clientWidth;
    if (container) {
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else if (direction === "right") {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="">
      <div className="relative border-b-2 sm:h-64 h-44 rounded-t-3xl bg-stone-50">
        <h1 className="text-2xl font-bold sm:text-3xl mx-4 pt-4">
          Any cravings on standby?
        </h1>
        <div className=" sm:-mt-8 -mt-6 mx-4">
          <div className=" flex justify-end sm:text-3xl text-xl text-teal-400">
            <button
              className="absolute sm:mr-12 mr-8  rounded-full  active:bg-teal-400 active:text-white"
              onClick={() => scroll("left")}
            >
              <span>
                <FaArrowCircleLeft />
              </span>
            </button>
            <button
              className="absolute  rounded-full  active:bg-teal-400 active:text-white"
              onClick={() => scroll("right")}
            >
              <span>
                <FaArrowCircleRight />
              </span>
            </button>
          </div>
          <div
            ref={containerRef}
            className="scrollbar overflow-x-auto flex items-center max-w-screen-xl mx-auto lg:pb-12"
          >
            {banner.map((bannerItem, index) => (
              <div key={index} className="flex-shrink-0 mx-4 mt-12">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_168,h_190/${bannerItem.imageId}`}
                  alt={bannerItem.action.text}
                  className="mix-blend-multiply h-full object-cover rounded-full w-24 md:w-32 xl:w-40 cursor-pointer"
                  onClick={() =>
                    console.log(`Clicked on ${bannerItem.action.text}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
