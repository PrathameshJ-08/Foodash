import { LoadingImg } from "../images";
import "./ResMenuShimmer.css";

const Shimmer = () => {
  return (
    <div className="mx-4 md:mx-10 lg:mx-20 xl:mx-40 z-10">
      {/* Header Shimmer */}
      <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 shimmer mb-4 h-44 md:mt-28 -mt-6 relative rounded-2xl">
        <div className=" grayscale absolute inset-0 flex items-center justify-center ">
          <LoadingImg />
        </div>
      </div>

      {/* Content Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 p-5 border-y-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shimmer h-48 rounded-2xl"
          ></div>
        ))}
      </div>

      {/* Button Shimmer */}
      <div className="flex justify-between items-center p-4">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shimmer h-10 w-16 md:w-40 rounded-2xl`}
          ></div>
        ))}
      </div>

      {/* Menu Items Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 p-4 mb-4 border-y-2">
        {[...Array(16)].map((_, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 shimmer h-64 rounded-2xl"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Shimmer;
