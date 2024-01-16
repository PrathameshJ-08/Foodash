import { LoadingImg } from "../images";
import "./ResMenuShimmer.css";

const Shimmer = () => {
  return (
    <div className="mx-4 md:mx-10 lg:mx-20 xl:mx-40 z-10">
      {/* Header Shimmer */}
      <div className="bg-gradient-to-r mb-4 rounded-md h-44 mt-32 bg-slate-800 relative">
        <div className=" grayscale absolute inset-0 flex items-center justify-center ">
          <LoadingImg />
        </div>
      </div>

      {/* Content Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 p-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shimmer h-48 rounded-2xl"
          ></div>
        ))}
      </div>

      {/* Button Shimmer */}
      <div className="flex justify-between items-center mb-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shimmer h-10 w-${
              index === 0 ? "24" : "40"
            } rounded-2xl`}
          ></div>
        ))}
      </div>

      {/* Menu Items Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {[...Array(16)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shimmer h-64 rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
