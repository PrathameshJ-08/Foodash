const Landing3 = () => {
  const handleGoogleClick = () => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=in.swiggy.android";
  };
  const handleIphoneClick = () => {
    window.location.href =
      "https://apps.apple.com/in/app/swiggy-food-grocery-delivery/id989540920";
  };
  return (
    <>
      <div className="flex mt-[-9rem]  bg-slate-50  w-full">
        <div className="xl:w-1/2 sm:w-1/3 w-2/3 flex flex-col justify-center xl:pl-44">
          <span className="xl:text-4xl text-xl  font-bold max-w-96  sm:ml-6  p-5 sm:p-0  sm:mt-0">
            Restaurants in your pocket
            <p className="xl:text-base text-xs w-36 sm:w-auto font-light  sm:mt-3">
              Order from your favorite restaurants & track on the go, with the
              all-new Swiggy app.
            </p>
          </span>

          <div className="flex space-x-4 xl:mt-12 xl:scale-100 sm:scale-50 xl:w-full scale-50  xl:p-5  w-96 -mt-8 sm:mt-0 -ml-20 xl:-ml-0">
            <button
              className="bg-slate-800 text-slate-50  hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-960 rounded-xl p-2 sm:px-6 sm:py-2 xl:max-w-52  sm:w-64 w-44"
              onClick={handleGoogleClick}
            >
              <div className="flex items-center">
                <i className="fa-brands fa-google-play pr-2  text-4xl" />
                <div>
                  <span className="xl:text-sm">Get it on </span>
                  <span className="text-xl">Google Play</span>
                </div>
              </div>
            </button>
            <button
              className="bg-slate-800 text-slate-50  hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray active:bg-gray-960 rounded-xl p-2 sm:px-6 sm:py-2 xl:max-w-52  sm:w-64 w-44"
              onClick={handleIphoneClick}
            >
              <div className="flex">
                <i className="fa-brands fa-apple pr-2 text-5xl" />
                <div>
                  <span className="text-sm">Download on the </span>{" "}
                  <span className="text-xl">App Store</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="md:flex ">
          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_368,h_438/pixel_wbdy4n"
            className="sm:w-64 sm:h-72 xl:w-80 xl:h-96 h-24 ml-[-40] md:ml-0 sm:-ml-8 "
            alt="Top Image"
          />

          <img
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_368,h_438/iPhone_wgconp_j0d1fn"
            className="sm:w-64 sm:h-72 xl:w-80 xl:h-96 h-24 sm:-ml-8 md:ml-0 "
            alt="Bottom Image"
          />
        </div>
      </div>
    </>
  );
};

export default Landing3;
