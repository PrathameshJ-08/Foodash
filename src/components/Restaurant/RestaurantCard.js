import { RESTAURANT_IMG_URL } from "../../utils/constants";
import StarsIcon from "@mui/icons-material/Stars";

const RestaurantCard = (props) => {
  const { resObj } = props;
  const {
    name,
    cloudinaryImageId,
    cuisines,
    avgRating,
    costForTwo,
    aggregatedDiscountInfoV3,
    areaName,
    sla,
    availability,
  } = resObj?.info;

  const isClosed = availability?.opened === false;

  return (
    <div
      className={`xl:h-auto relative transition-all duration-300 ease-in-out hover:cursor-pointer hover:transform hover:scale-105 hover:bg-gray-200 sm:hover:bg-stone-50 mb-2 xl:mb-0 grid sm:block grid-cols-4 sm:grid-cols-none rounded-xl border-y-2 border-dashed border-teal-600 sm:border-none xl:w-[246px] ${
        isClosed ? "grayscale" : ""
      }`}
    >
      {cloudinaryImageId ? (
        <div className="relative col col-span-1 xl:h-[160px]">
          <img
            className="rounded-xl h-28 w-28 object-cover sm:w-full sm:h-full"
            src={RESTAURANT_IMG_URL + cloudinaryImageId}
            alt={name}
          />
          <label className="absolute bg-gradient-to-t from-black text-sm xl:text-xl sm:text-2xl md:text-xl font-bold text-white sm:w-full w-28 pt-6 pb-2 px-2 sm:mt-[165px] xl:mt-[126px] bottom-0 sm:text-center rounded-xl cursor-pointer">
            {aggregatedDiscountInfoV3.header}{" "}
            {aggregatedDiscountInfoV3.subHeader}
          </label>
        </div>
      ) : (
        <div className="col col-span-1 xl:h-[190px] flex items-center justify-center">
          <div className="text-gray-500">No Image Available</div>
        </div>
      )}

      <div className="sm:mx-2 col-span-3 p-2 px-2 sm:px-0">
        <div className="overflow-hidden">
          <h1 className="font-bold text-lg truncate">{name}</h1>
        </div>
        <div className="flex sm:justify-between justify-start text-base">
          <div
            className={`flex items-center rounded-xl ${
              avgRating < 3.5
                ? "text-red-700 bg-red-200"
                : "text-green-700 bg-green-200"
            }`}
          >
            <StarsIcon className="" />
            <span className="text-black pr-2">
              {avgRating % 1 === 0 ? avgRating + ".0" : avgRating}
            </span>
          </div>
          <span>• {resObj.info.sla.deliveryTime} mins</span>
          <p>• {costForTwo}</p>
        </div>
        <p className="text-sm mt-1 truncate pt-1">{cuisines.join(", ")}</p>
        <span className="text-sm">{areaName}</span>
        <span className="text-sm p-2">• {sla.lastMileTravelString}</span>
      </div>
    </div>
  );
};

//HIGHER ORDER COMPONENT
// input - Restaurant card
// output - Res Card promoted

export const withPromoted = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-gradient-to-r from-teal-500 to-green-500 text-white px-3  rounded-lg overflow-hidden z-10 shadow-lg m-1 text-xs sm:text-base font-black">
          4.5+
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
