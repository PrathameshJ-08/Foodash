import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Landing from "./components/LandingPage/Landing";
import RestaurantList from "./components/Restaurant/RestaurantList";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import ResMenuShimmer from "./assets/Shimmer/ResMenuShimmer";
import appStore from "./utils/appStore";
import CartLayout from "./components/Restaurant/CartLayout";
import EmptyCart from "./assets/EmptyCart";
import Error from "./assets/Error";
import useOnlineStatus from "./utils/hooks/useOnlineStatus";
import Offline from "./assets/Offline";

import "./index.css";

import { UserProvider } from "./utils/userContext";
import { LoadingImg } from "./assets/images.js";

const RestaurantMenu = lazy(() =>
  import("./components/Restaurant/Menu/RestaurantMenu.js")
);
const AppLayout = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const isLandingPage = currentPath === "/";
  const isContactPage = currentPath === "/contact";

  const renderHeader = !isLandingPage && <Header />;
  const renderFooter = !(isLandingPage || isContactPage) && <Footer />;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {}, [location]);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <Offline />;

  return (
    <UserProvider>
      <Provider store={appStore}>
        {loading ? (
          <div className=" bg-slate-950  h-screen overflow-hidden flex items-center justify-center">
            <div className="animate-pulse ">
              <LoadingImg width="w-[60rem]" />
            </div>
          </div>
        ) : (
          <div>
            {renderHeader}
            <Outlet />
            {renderFooter}
          </div>
        )}
      </Provider>
    </UserProvider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/rlist",
        element: <RestaurantList />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: <CartLayout />,
      },
      {
        path: "/emptycart",
        element: <EmptyCart />,
      },

      {
        path: "/rlist/restaurants/:resId",
        element: (
          <Suspense fallback={<ResMenuShimmer />}>
            <RestaurantMenu />,
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
