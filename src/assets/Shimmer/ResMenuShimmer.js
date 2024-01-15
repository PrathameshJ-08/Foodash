import "./ResMenuShimmer.css";

const ResMenuShimmer = () => {
  return (
    <>
      <div className="shimmer flex flex-row p-5 py-36"></div>
      <div className="justify-center items-center flex flex-row">
        <div className="shimmer px-28 p-5  rounded-full  -mt-[22px] mb-5  text-center"></div>
      </div>

      <div className="max-w-800 mx-auto xl:px-80 xl:py-10 sm:px-10 sm:py-5 ">
        <div className="grid sm:gap-10 px-20 ">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="shimmer flex border border-solid rounded-2xl xl:p-16
            sm:px-44 sm:py-6 py-10 mt-10 sm:mt-0"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ResMenuShimmer;
