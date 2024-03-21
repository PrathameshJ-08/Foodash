import React, { useEffect, useState } from "react";
import { Logo } from "../../assets/images";

import useLocation from "../../utils/hooks/useLocation";
import Landing2 from "./Landing2";
import Landing3 from "./Landing3";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import "./slide.css";

const Landing = () => {
  const { renderLocationSearchBar } = useLocation();
  const [headlinesIndex, setHeadlinesIndex] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const headlines = [
    "Hungry?",
    "Unexpected guests?",
    "Craving a snack?",
    "Late-night cravings?",
    "Movie marathon?",
    "Game night?",
    "Friends gathering?",
    "Study break?",
    "Date night at home?",
    "Busy day, easy dinner!",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeadlinesIndex((prevIndex) => (prevIndex + 1) % headlines.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [headlines.length]);

  const handleSignUpClick = () => {
    setShowSignUp(true);
    setShowLogin(false);
    setShowForm(true);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignUp(false);
    setShowForm(true);
  };

  return (
    <div className="">
      {showForm && (
        <div className="bg-black w-full absolute bg-opacity-75  h-full"></div>
      )}
      <div
        className={`${
          showForm ? " overflow-clip pointer-events-none h-screen" : ""
        }`}
      >
        <div
          className={`xl:flex font-proxima-nova font-sans font-helvetica-neue bg-slate-50 ${
            showForm && "mr-3"
          }`}
        >
          <div className="xl:w-1/2">
            <section className="flex-1 flex flex-col sm:p-16 px-7 py-16">
              <div className="sm:flex items-center px-10 md:px-0">
                <div className="-mb-12 md:mb-0 -ml-8 md:ml-0">
                  <Logo width="w-16 sm:w-24" ml="ml-0" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-teal-500 ml-12 md:ml-1">
                  FOODASH
                </h1>

                <div className="ml-auto flex xl:items-center items-end sm:space-x-4 mt-8 md:mt-0">
                  <button
                    className="px-6 py-2 rounded font-bold sm:text-base"
                    onClick={handleLoginClick}
                  >
                    Login
                  </button>
                  {showLogin && (
                    <Login
                      setShowLogin={setShowLogin}
                      showLogin={showLogin}
                      setShowForm={setShowForm}
                      showSignUp={showSignUp}
                      setShowSignUp={setShowSignUp}
                    />
                  )}

                  <button
                    className="bg-slate-700 text-white rounded font-bold sm:text-base sm:w-[118px] p-2 sm:px-2 sm:py-2"
                    onClick={handleSignUpClick}
                  >
                    Sign up
                  </button>
                  {showSignUp && (
                    <SignUp
                      setShowForm={setShowForm}
                      setShowSignUp={setShowSignUp}
                      showSignUp={showSignUp}
                      setShowLogin={setShowLogin}
                      showLogin={showLogin}
                    />
                  )}
                </div>
              </div>
              <div className="slider-container mt-4 md:mt-16">
                <h1 className="slide-in text-3xl sm:text-5xl font-bold mt-16 ">
                  {headlines[headlinesIndex]}
                </h1>
              </div>

              <h2 className=" text-2xl text-gray-500 mt-4 mb-8">
                Order food from favourite restaurants near you.
              </h2>
              {showForm ? (
                <div>
                  <div className="flex items-center">
                    <input
                      type="text"
                      className="flex-1 px-6 sm:py-5 py-4 rounded-l border-y-2 border-l-2 border-r-none border-cyan-950 bg-teal-50 focus:outline-none placeholder:italic"
                      placeholder={`Enter your delivery location...`}
                    />

                    <button className="bg-yellow-500 border-y-2 border-r-2 border-l-none border-cyan-950 text-white px-8 sm:py-5 py-5 text-xs sm:text-base rounded-r w-40 ">
                      Find Me
                    </button>
                  </div>
                </div>
              ) : (
                <div className={`w-full ${showForm ? " opacity-55" : ""}`}>
                  {renderLocationSearchBar()}
                </div>
              )}
            </section>
            <div className="text-slate-400 bg-cyan-950 w-full mt-[-6rem] pl-8 sm:pl-16">
              <h2 className="pt-16 ">POPULAR CITIES IN INDIA</h2>
              <span>
                Ahmedabad Bangalore Chennai Delhi Gurgaon Hyderabad Kolkata
                Mumbai Pune & more.
              </span>
              <h2 className="pt-16 text-lg sm:text-3xl sm:pb-16">
                A SWIGGY CLONE made with 🤍 & ReactJs
              </h2>
            </div>
          </div>

          <div className="flex-1 xl:h-full bg-orange-100 md:rounded-bl-3xl">
            <img
              src="https://web.archive.org/web/20210903175246im_/https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_1340/Lunch1_vlksgq"
              className="w-full h-44 sm:h-96 object-cover xl:h-[40rem] md:rounded-bl-3xl"
              alt="Food Image"
              loading="lazy"
            />
          </div>
        </div>

        <Landing2 />
        <Landing3 />
      </div>
    </div>
  );
};

export default Landing;
