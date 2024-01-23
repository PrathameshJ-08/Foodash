import React, { useEffect, useState } from "react";
import RestaurantCard, { withPromoted, withWidth } from "./RestaurantCard";
import Shimmer from "../../assets/Shimmer/Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../../utils/hooks/useOnlineStatus";
import Offline from "../../assets/Offline";
import useFetchRestaurants from "../../utils/hooks/useFetchRestaurants";
import FilterRestaurant from "./FilterRestaurant";
import Banner from "./Banner";

const RestaurantList = () => {
  const { listOfRes, filteredRes, setFilteredRes, fetchData, banner } =
    useFetchRestaurants();
  const [searchText, setSearchText] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    topRated: true,
    lowerToHigherPrice: false,
    higherToLowerPrice: false,
    lowestDeliveryTime: false,
    cuisines: false,
    selectedCuisine: null,
  });

  const ResCardPromoted = withPromoted(RestaurantCard);
  const ResCard = withWidth(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (filterType, cuisine = null) => {
    let filteredList = listOfRes;

    switch (filterType) {
      case "topRated":
        filteredList = filterOptions.topRated
          ? listOfRes
          : listOfRes
              .slice()
              .sort((a, b) => b.info.avgRating - a.info.avgRating);
        break;
      case "lowerToHigherPrice":
        filteredList = filterOptions.lowerToHigherPrice
          ? listOfRes
          : listOfRes
              .slice()
              .sort(
                (a, b) =>
                  parseFloat(a.info.costForTwo.split("₹")[1]) -
                  parseFloat(b.info.costForTwo.split("₹")[1])
              );
        break;
      case "higherToLowerPrice":
        filteredList = filterOptions.higherToLowerPrice
          ? listOfRes
          : listOfRes
              .slice()
              .sort(
                (a, b) =>
                  parseFloat(b.info.costForTwo.split("₹")[1]) -
                  parseFloat(a.info.costForTwo.split("₹")[1])
              );
        break;
      case "lowestDeliveryTime":
        filteredList = filterOptions.lowestDeliveryTime
          ? listOfRes
          : listOfRes
              .slice()
              .sort(
                (a, b) => a.info.sla.deliveryTime - b.info.sla.deliveryTime
              );
        break;
      case "cuisines":
        filteredList = cuisine
          ? listOfRes.filter((res) => res.info.cuisines.includes(cuisine))
          : listOfRes;
        break;
      default:
        break;
    }

    setFilterOptions({
      topRated: false,
      lowerToHigherPrice: false,
      higherToLowerPrice: false,
      lowestDeliveryTime: false,
      cuisines: false,
      selectedCuisine: cuisine,
      [filterType]: true,
    });

    setFilteredRes(filteredList);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    const filteredRes = listOfRes.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRes(filteredRes);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) return <Offline />;

  if (listOfRes.length === 0) return <Shimmer />;

  return (
    <main className="mx-4 md:mx-10 lg:mx-20 xl:mx-40 text-slate-700 pb-5 md:mt-28 -mt-5">
      <h1 className="text-2xl font-bold sm:text-3xl">
        Any cravings on standby?
      </h1>
      <Banner />
      <div className="lg:block shadow-lg md:shadow-none rounded-2xl">
        <h1 className="text-2xl font-bold mt-8">Top tastes around</h1>
        <div className="border-b-2 flex items-center max-w-full mx-auto mt-4 overflow-x-auto">
          <div className="flex flex-col sm:flex-row gap-2 md:gap-8 rounded-xl h-[20.1rem] overflow-x-auto max-w-screen-xl menu-scroll  px-1 ">
            {listOfRes.map((rlist) => (
              <div
                key={rlist.info.id}
                className="flex-shrink-0 md:mb-0 sm:w-44 md:w-[246px] xl:w-auto"
              >
                <Link to={`restaurants/${rlist.info.id}`} className="block">
                  <ResCard resObj={rlist} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mt-12 -mb-4">Local bites to you</h1>

      <FilterRestaurant
        filterOptions={filterOptions}
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        handleSearchClick={handleSearchClick}
        searchText={searchText}
        listOfRes={listOfRes}
        setFilteredRes={setFilteredRes}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 xl:gap-10 sm:p-8 md:px-0 z-0 py-6 border-y-2">
        {filteredRes.map((rlist) => (
          <Link key={rlist.info.id} to={`restaurants/${rlist.info.id}`}>
            {rlist.info.avgRating >= 4.5 ? (
              <ResCardPromoted resObj={rlist} />
            ) : (
              <RestaurantCard resObj={rlist} />
            )}
          </Link>
        ))}
      </div>
    </main>
  );
};

export default RestaurantList;
