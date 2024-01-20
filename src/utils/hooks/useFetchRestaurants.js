import { useState, useEffect } from "react";
import useGeolocation from "./useGeolocation";

const useFetchRestaurants = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [filteredRes, setFilteredRes] = useState([]);
  const [banner, setBanner] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useGeolocation();

  useEffect(() => {
    fetchData(location.coordinates.lat, location.coordinates.long);
  }, [location.coordinates.lat, location.coordinates.long]);

  const fetchData = async (lat, long) => {
    try {
      setIsLoading(true);
      // const proxyUrl = "http://localhost:3001/swiggy-api";
      const proxyUrl = "https://foodash-server.onrender.com/swiggy-api";
      const data = await fetch(`${proxyUrl}?lat=${lat}&lng=${long}`);

      if (!data.ok) {
        console.error(`HTTP error! Status: ${data.status}`);
        console.log("Raw Response:", await data.text());
        throw new Error(`HTTP error! Status: ${data.status}`);
      }

      const tojson = await data.json();

      const restaurantsInfo =
        tojson?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      const bannerInfo =
        tojson?.data?.cards?.[0]?.card?.card?.gridElements?.infoWithStyle?.info;

      const cities = tojson?.data?.cards[10]?.card?.card?.cities;

      if (restaurantsInfo) {
        setListOfRes(restaurantsInfo);
        setFilteredRes(restaurantsInfo);
      }

      if (cities) {
        setCitiesData(cities.map((city) => city.text));
      }

      if (bannerInfo) {
        setBanner(bannerInfo);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setIsLoading(false);
    }
  };

  return {
    listOfRes,
    filteredRes,
    setFilteredRes,
    fetchData,
    banner,
    citiesData,
    isLoading,
    error,
    location,
  };
};

export default useFetchRestaurants;
