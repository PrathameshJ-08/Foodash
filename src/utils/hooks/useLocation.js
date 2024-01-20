import React, { useState, useEffect } from "react";
import { GETALL_RESTAURANTS_API } from "../constants";
import useFetchRestaurants from "./useFetchRestaurants";

const useLocation = () => {
  const [query, setQuery] = useState("");
  const [res, setRes] = useState([]);
  const [link, setLink] = useState("");

  const { citiesData } = useFetchRestaurants();

  useEffect(() => {
    if (!query) return;

    let temp = document.querySelector(".trip1");
    if (temp) temp.style.display = "none";
    const id = setTimeout(() => {
      const filteredCities = citiesData.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      setRes(filteredCities.slice(0, 5));
    }, 300);

    return () => clearTimeout(id);
  }, [query]);

  const handleSearch = () => {
    const newLink = `https://www.swiggy.com/city/${query.toLowerCase()}`;
    setLink(newLink);
    window.open(newLink, "_blank");
  };

  const renderLocationSearchBar = () => (
    <>
      <div
        className="relative"
        onClick={() => {
          document.querySelector(".suggestion").style.display = "none";
        }}
      >
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 px-6 sm:py-5 py-4 rounded-l border-y-2 border-l-2 border-r-none border-cyan-950 bg-teal-50 focus:outline-none placeholder:italic"
            placeholder={`Enter your delivery location...`}
            autoFocus={true}
            spellCheck={false}
            onChange={(e) => setQuery(e.target.value)}
            value={query}
          />

          <button
            className="bg-yellow-500 border-y-2 border-r-2 border-l-none border-cyan-950 text-white px-8 sm:py-5 py-3 text-xs sm:text-base rounded-r w-40 "
            onClick={handleSearch}
          >
            {query ? "Find Food" : "Find Me  "}
          </button>
        </div>

        <article
          className="suggestion absolute bg-white shadow-md w-full border-x-2 rounded-md overflow-hidden bg-opacity-95"
          style={{
            display: query && res.length > 0 ? "" : "none",
            maxHeight: "200px",
          }}
        >
          {res.map((item, index) => (
            <div
              key={index}
              className={`border-b border-dashed ${
                index === res.length - 1 ? "border-0" : "border-yellow-500 "
              }`}
            >
              <p
                className="flex items-center py-2 px-4 cursor-pointer hover:bg-emerald-100 hover:font-semibold"
                onClick={() => {
                  setQuery(item);
                }}
              >
                <i className="fa-solid fa-location-dot text-teal-500 mr-2" />
                {item}
              </p>
            </div>
          ))}
        </article>
      </div>
    </>
  );

  return {
    renderLocationSearchBar,
    citiesData,
  };
};
export default useLocation;
