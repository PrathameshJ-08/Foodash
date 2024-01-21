const Offers = ({ offers }) => {
  // console.log(offers);
  return (
    <div className="flex justify-center items-center mb-5">
      <div className="menu overflow-x-scroll justify-center text-center items-center z-20 p-4 md:w-[55%] rounded-2xl">
        <div className="flex mx-auto px-5 space-x-4 scrollbar">
          {offers.map((offerItem, index) => (
            <div
              key={index}
              className="flex-shrink-0 flex flex-col items-center space-y-2 p-2 border border-dashed border-teal-600 rounded-md shadow-md"
              style={{ maxWidth: "300px" }}
            >
              <span className="text-sm font-semibold text-zinc-500">
                {offerItem.info.header}
              </span>
              <span className="text-xs text-gray-600">
                {offerItem.info.couponCode} | {offerItem.info.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
