import { useState, useEffect } from "react";
import useGeolocation from "./useGeolocation"; // Adjust the path based on your file structure
import { GETALL_RESTAURANTS_API } from "../constants";

const useFetchRestaurants = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [banner, setBanner] = useState([]);

  const location = useGeolocation(); // Get the location using the useGeolocation hook

  useEffect(() => {
    fetchData(location.coordinates.lat, location.coordinates.long);
  }, [location]);

  const fetchData = async (lat, long) => {
    try {
      const data = await fetch(
        `${GETALL_RESTAURANTS_API}?lat=${lat}&lng=${long}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      const tojson = await data.json();

      const bannerInfo =
        tojson?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.info;
      const restaurantsInfo =
        tojson?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      if (bannerInfo) {
        setBanner(bannerInfo);
      }

      if (restaurantsInfo) {
        setListOfRes(restaurantsInfo);
        setFilteredRes(restaurantsInfo);
      }

      console.log(bannerInfo);
      console.log(restaurantsInfo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { listOfRes, filteredRes, setFilteredRes, fetchData, banner };
};

export default useFetchRestaurants;
