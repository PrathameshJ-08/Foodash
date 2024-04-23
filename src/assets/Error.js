// In Error.js
import React from "react";
import { Link } from "react-router-dom";
import { Error404 } from "./images";

const Error = ({ message }) => {
  // Accept message as props
  return (
    <section className="bg-gradient-to-t from-orange-400 to-sky-400 py-24 font-arvo text-sky-950 p-10 h-screen">
      <div className="w-full ">
        <div className="text-center items-center">
          <h1 className="text-6xl text-center font-extrabold">
            404: Page Not Found
          </h1>

          <Error404 />

          <div className="contant_box_404">
            <h3 className="text-6xl text-center mb-2">
              {message ? message : "Looks like you're lost"}{" "}
              {/* Display message if exists */}
            </h3>
            <p>The page you are looking for is not available!</p>
            <Link
              to="/"
              className="inline-block bg-green-500 text-white px-8 py-4 mt-8 rounded-2xl"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
