import { LANDINGIMG } from "../../utils/constants";

const Landing2 = () => {
  return (
    <div className="xl:p-48 sm:py-48 pb-44 pt-64 xl:-mt-52 sm:-mt-40 -mt-60 bg-cyan-950 flex justify-between gap-11 px-5 text-center">
      <div className="flex flex-col items-center w-64">
        <img
          src={`${LANDINGIMG}_-_No_min_order_x0bxuf.png`}
          className="w-20 sm:w-32"
        />
        <span className="font-bold text-slate-300 sm:text-xl mt-7 text-xs">
          No Minimum Order
        </span>
        <p className=" text-slate-300 text-center mt-2 text-[10px] sm:text-base">
          Order in for yourself or for the group, with no restrictions on order
          value
        </p>
      </div>
      <div className="flex flex-col items-center w-64">
        <img
          src={`${LANDINGIMG}_Live_order_zzotwy.png`}
          className="w-20 sm:w-32 "
        />
        <span className="font-bold text-slate-300 sm:text-xl text-xs mt-7">
          Live Order Tracking
        </span>
        <p className=" text-slate-300 text-center mt-2 text-[10px] sm:text-base">
          Know where your order is at all times, from the restaurant to your
          doorstep
        </p>
      </div>
      <div className="flex flex-col items-center w-64">
        <img
          src={`${LANDINGIMG}_-_Super_fast_delivery_awv7sn.png`}
          className="w-20 sm:w-32 "
        />
        <span className="font-bold text-slate-300 sm:text-xl text-xs mt-7">
          Lightning-Fast Delivery
        </span>
        <p className=" text-slate-300 text-center mt-2 text-[10px] sm:text-base">
          Experience Swiggy's superfast delivery for food delivered fresh & on
          time
        </p>
      </div>
    </div>
  );
};

export default Landing2;
