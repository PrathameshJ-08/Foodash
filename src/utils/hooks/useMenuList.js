import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGeolocation from "./useGeolocation";

const useMenuList = () => {
  const { resId } = useParams();
  const location = useGeolocation();
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    const fetchData = async (lat, long) => {
      try {
        // const proxyUrl = "http://localhost:3001/swiggy-menu";
        const proxyUrl = "https://foodash.vercel.app/api/swiggy-menu";

        const data = await fetch(
          `${proxyUrl}?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${long}&restaurantId=${resId}`
        );
        const toJson = await data.json();

        if (toJson.statusCode === 1) {
          console.error("Swiggy API Error:", toJson.statusMessage);
        } else {
          setResInfo(toJson);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (location.loaded) {
      fetchData(location.coordinates.lat, location.coordinates.long);
    }
  }, [
    location.coordinates.lat,
    location.coordinates.long,
    location.loaded,
    resId,
  ]);

  return resInfo;
};

export default useMenuList;
