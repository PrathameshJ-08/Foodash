import React from "react";

const Modal = ({ onNo, onYes }) => {
  return (
    <div className="fixed inset-0 flex items-center lg:items-end justify-center z-50 lg:bottom-5 px-5">
      <div className="w-full md:w-[30rem] bg-white rounded-xl p-5 shadow-md border-4 border-sky-700">
        <div>
          <p className="md:text-2xl font-bold ">Items already in the cart.</p>
          <p className="md:text-lg font-thin mb-4">
            Your cart contains items from another restaurant. Would you like to
            reset your cart for adding items from this restaurant?
          </p>
          <div className="modal-buttons flex space-x-4 font-bold">
            <button
              onClick={onNo}
              className="flex-1 px-4  py-2 border border-amber-500 text-amber-500 rounded hover:bg-amber-50 focus:outline-none focus:border-amber-700 focus:ring focus:ring-amber-200 text-xs md:text-base"
            >
              NO
            </button>
            <button
              onClick={onYes}
              className="flex-1  px-4  py-2 bg-sky-700 text-white rounded hover:bg-sky-900 focus:outline-none focus:border-teal-700 focus:ring focus:ring-teal-200 text-xs md:text-base"
            >
              YES, START AFRESH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
