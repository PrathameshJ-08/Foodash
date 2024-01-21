import React, { Suspense, lazy, useEffect } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RestaurantList from "./components/Restaurant/RestaurantList";
import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  useLocation,
} from "react-router-dom";
import Contact from "./components/Contact";
import About from "./components/About";
import Error from "./assets/Error";
import Landing from "./components/LandingPage/Landing";
import useOnlineStatus from "./utils/hooks/useOnlineStatus";
import Offline from "./assets/Offline";
import "./index.css";
import ResMenuShimmer from "./assets/Shimmer/ResMenuShimmer";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import CartLayout from "./components/Restaurant/CartLayout";
import EmptyCart from "./assets/EmptyCart";
import Login from "./components/Auth/Login";
import { UserProvider } from "./utils/userContext";
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

  useEffect(() => {}, [location]);

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <Offline />;

  return (
    <UserProvider>
      <Provider store={appStore}>
        <div>
          {renderHeader}
          <Outlet />
          {/* <Footer /> */}
          {renderFooter}
        </div>
      </Provider>{" "}
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
        path: "/About",
        element: <About />,
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
        path: "/login",
        element: <Login />,
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
