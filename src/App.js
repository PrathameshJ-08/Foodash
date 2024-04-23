import React, { Suspense, lazy, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header.js";
import Landing from "./components/LandingPage/Landing.js";
import RestaurantList from "./components/Restaurant/RestaurantList.js";
import Contact from "./components/Contact.js";
import CartLayout from "./components/Restaurant/CartLayout.js";
import Footer from "./components/Footer.js";

import useOnlineStatus from "./utils/hooks/useOnlineStatus.js";
import { UserProvider } from "./utils/userContext.js";
import PrivateRoute from "./utils/PrivateRoute.js";
import appStore from "./utils/appStore.js";

import ResMenuShimmer from "./assets/Shimmer/ResMenuShimmer.js";
import { LoadingImg } from "./assets/images.js";
import EmptyCart from "./assets/EmptyCart.js";
import Offline from "./assets/Offline.js";
import Error from "./assets/Error.js";

import "./index.css";

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

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <Offline />;

  return (
    <UserProvider>
      <Provider store={appStore}>
        {loading ? (
          <div className="bg-slate-950 h-screen overflow-hidden flex items-center justify-center">
            <div className="animate-pulse">
              <LoadingImg width="w-[60rem]" />
            </div>
          </div>
        ) : (
          <div>
            {renderHeader}
            <Routes>
              <Route path="/" element={<Landing />} />

              <Route
                path="/rlist"
                element={<PrivateRoute component={RestaurantList} />}
              />
              <Route
                path="/contact"
                element={<PrivateRoute component={Contact} />}
              />
              <Route
                path="/cart"
                element={<PrivateRoute component={CartLayout} />}
              />
              <Route
                path="/emptycart"
                element={<PrivateRoute component={EmptyCart} />}
              />
              <Route
                path="/rlist/restaurants/:resId"
                element={
                  <Suspense fallback={<ResMenuShimmer />}>
                    <PrivateRoute component={RestaurantMenu} />
                  </Suspense>
                }
              />
              <Route path="*" element={<Error />} />
            </Routes>
            {renderFooter}
          </div>
        )}
      </Provider>
    </UserProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <AppLayout />
  </Router>
);
