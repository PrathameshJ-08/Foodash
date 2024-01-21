import React, { useEffect, useState } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", long: "" },
    address: {},
  });

  const onSuccess = async (location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.coords.latitude}&lon=${location.coords.longitude}&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.display_name) {
        setLocation({
          loaded: true,
          coordinates: {
            lat: location.coords.latitude,
            long: location.coords.longitude,
          },
          address: data.address,
        });
      } else {
        throw new Error("No location data found");
      }
    } catch (error) {
      setLocation({
        loaded: true,
        error: error.message || "Error fetching location data",
      });
    }
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;
