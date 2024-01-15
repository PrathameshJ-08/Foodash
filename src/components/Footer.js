import React, { useState } from "react";
import useLocation from "../utils/hooks/useLocation";

const Cities = ({ showAllCities }) => {
  const { citiesData } = useLocation();

  return (
    <div className="px-44 border-t-[1px] border-gray-300 pt-6">
      <h1 className="font-bold text-xl pb-12">Other cities that we deliver:</h1>
      <div className="flex justify-center">
        {showAllCities && (
          <div className="grid grid-cols-4 gap-x-32 gap-y-4">
            {citiesData.map((city, index) => (
              <span key={index}>{city}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  const [showAllCities, setShowAllCities] = useState(false);

  const toggleShowAllCities = () => {
    setShowAllCities(!showAllCities);
  };

  return (
    <footer className="bg-gray-950 text-slate-300 py-8 ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-44 pt-4 pb-20">
        <div>
          <h3 className="text-xl font-bold mb-2">FOODASH</h3>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Technologies Pvt. Ltd
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <div className="flex flex-col text-gray-400 text-xs  space-y-2">
            <span>About</span>
            <span>Careers</span>
            <span>Team</span>
            <span>One</span>
            <span>Instamart</span>
            <span>Genie</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2 flex flex-col">Contact us</h3>
          <div className="flex flex-col text-gray-400 text-xs  space-y-2">
            <span>Help & Support</span>
            <span>Partner with us</span>
            <span>Ride with us</span>

            <h3 className="text-lg font-bold pt-8 mb-4">Legal</h3>
            <div className="flex flex-col text-gray-400 text-xs  space-y-2">
              <span>Terms & Conditions</span>
              <span>Cookie Policy</span>
              <span>Privacy Policy</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">We deliver to:</h3>
          <div className="flex flex-col text-gray-400 text-xs  space-y-2">
            <span>Bangalore</span>
            <span>Gurgaon</span>
            <span>Hyderabad</span>
            <span>Delhi</span>
            <span>Mumbai</span>
            <span className="pb-4">Pune</span>
            <button
              className="border-2 w-24 p-1 rounded-xl cursor-pointer text-start text-xs  "
              onClick={toggleShowAllCities}
            >
              {showAllCities ? "Show less 🔼" : "589 cities 🔽"}
            </button>
          </div>
        </div>
      </div>
      {showAllCities && <Cities showAllCities={showAllCities} />}
    </footer>
  );
};

export default Footer;
