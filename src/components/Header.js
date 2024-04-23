import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useUserContext } from "../../src/utils/userContext";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";

import { Logo } from "../assets/images";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ContactSupportOutlinedIcon from "@mui/icons-material/ContactSupportOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";

const MobileHeader = ({ handleLogout }) => {
  const [activeTab, setActiveTab] = useState("home");

  const cartItems = useSelector((store) => store.cart.items) || [];
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="z-50 fixed bottom-0 w-full bg-slate-200 flex justify-around items-center py-2 lg:hidden rounded-t-3xl border-t-2  text-xs ">
      <Link
        to="/rlist"
        onClick={() => handleTabClick("home")}
        className={`text-center ${
          activeTab === "home" ? "text-emerald-600" : "text-gray-500"
        }`}
      >
        <HomeOutlinedIcon style={{ fontSize: "1.5rem" }} />
        <div className="-mt-1">Home</div>
      </Link>
      <Link
        to={cartItems.length === 0 ? "/emptycart" : "/cart"}
        onClick={() => handleTabClick("cart")}
        className={`text-center ${
          activeTab === "cart" ? "text-emerald-600" : "text-gray-500"
        }`}
      >
        <ShoppingCartOutlinedIcon style={{ fontSize: "1.5rem" }} />
        <div className="-mt-1">Cart</div>
        {cartItems.length > 0 && (
          <span className="absolute text-green-600 bg-green-300 rounded-full px-[0.3rem] -mt-10 ml-1 text-xs opacity-90">
            {totalQuantity}
          </span>
        )}
      </Link>

      <Link
        to="/contact"
        onClick={() => handleTabClick("contact")}
        className={`text-center ${
          activeTab === "contact" ? "text-emerald-600" : "text-gray-500"
        }`}
      >
        <ContactSupportOutlinedIcon style={{ fontSize: "1.5rem" }} />
        <div className="-mt-1">Contact</div>
      </Link>
      <button onClick={handleLogout} className="text-center text-gray-500">
        <LogoutOutlinedIcon style={{ fontSize: "1.5rem" }} />
        <div className="-mt-1">Logout </div>
      </button>
    </div>
  );
};

const Header = () => {
  const { user, updateUser } = useUserContext();
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingWidth, setLoadingWidth] = useState("100%");

  useEffect(() => {
    if (user.name) {
      setIsLoading(true);
      setShowNotification(true);

      const intervalId = setInterval(() => {
        setLoadingWidth((prevWidth) => {
          const newWidth = Math.max(parseFloat(prevWidth) - 1, 0) + "%";

          if (newWidth === "0%") {
            setIsLoading(false);
            setShowNotification(false);
            clearInterval(intervalId);
          }
          return newWidth;
        });
      }, 25);
      return () => clearInterval(intervalId);
    }
  }, [user.name]);

  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();

  const handleLogout = () => {
    updateUser(null);
    navigate("/");
  };

  const cartItems = useSelector((store) => store.cart.items) || [];

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      {showNotification && (
        <div className="px-4 fixed top-8 lg:top-16 right-4 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white  py-2 rounded-md shadow-md z-50 animate-pulse">
          <span className="font-bold">Hello {user.name}!</span>
          {isLoading && (
            <div
              className="mt-3 bg-white h-1 "
              style={{ width: loadingWidth }}
            ></div>
          )}
        </div>
      )}
      <div className="z-40 md:px-24 sm:px-2 bg-zinc-100 fixed top-0 w-full lg:flex justify-between shadow-md border-t-4 border-emerald-400 text-slate-700 h-16 md:h-[6.2rem] hidden">
        <div className="w-12 md:w-24">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center  ">
          <ul className="flex flex-wrap items-center">
            <li className="sm:px-4 hidden sm:block">
              <div className="group inline-block relative">
                {onlineStatus ? (
                  <WifiIcon
                    className="text-green-400 hover:cursor-pointer animate-pulse"
                    title="Online"
                  />
                ) : (
                  <WifiOffIcon
                    className="text-red-400 hover:cursor-pointer "
                    title="Offline"
                  />
                )}
                <div className="opacity-0 cursor-pointer bg-opacity-60 group-hover:opacity-100 group-hover:visible bg-slate-200 shadow-lg text-xs rounded  absolute z-10 transition -mt-3 -ml-9 px-2">
                  {onlineStatus ? "Online" : "Offline"}
                </div>
              </div>
            </li>
            <li className="px-2 sm:px-4 hover:text-emerald-400 font-bold">
              <Link to="/rlist">Home</Link>
            </li>
            <li className="px-2 sm:px-4 hover:text-emerald-400 font-bold">
              <Link to="/contact">Contact </Link>
            </li>
            <li className="px-2 sm:px-4 hover:text-emerald-400 font-bold">
              {cartItems.length === 0 ? (
                <Link to="/emptycart">Cart</Link>
              ) : (
                <Link to="/cart">
                  <span className="text-green-600 bg-green-300 rounded-full px-2 py-[0.1rem]">
                    {totalQuantity}
                  </span>{" "}
                  Cart
                </Link>
              )}
            </li>
            <li>
              <button
                className="bg-emerald-300 hover:bg-teal-500 active:bg-teal-700 focus:outline-none focus:ring focus:ring-emerald-300 px-3 rounded-2xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      <MobileHeader handleLogout={handleLogout} />
    </div>
  );
};

export default Header;
