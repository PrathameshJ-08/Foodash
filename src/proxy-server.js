// const express = require("express");
// const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");

// const app = express();
// const port = process.env.PORT || 3001;

// app.use(cors());

// app.use((req, res, next) => {
//   console.log(`Proxying request: ${req.method} ${req.url}`);
//   next();
// });

// app.use(
//   "/swiggy-api",
//   createProxyMiddleware({
//     target: "https://www.swiggy.com",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/swiggy-api": "/dapi/restaurants/list/v5",
//     },
//   })
// );

// app.use(
//   "/swiggy-menu",
//   createProxyMiddleware({
//     target: "https://www.swiggy.com",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/swiggy-menu": "/dapi/menu/pl",
//     },
//   })
// );

// app.listen(port, () => {
//   console.log(`Proxy server is running on port ${port}`);
// });

// Update the target URL for /swiggy-api route
const swiggyApiProxy = createProxyMiddleware({
  target: process.env.SWIGGY_API_URL || "https://www.swiggy.com",
  changeOrigin: true,
  pathRewrite: {
    "^/swiggy-api": "/dapi/restaurants/list/v5",
  },
});

// Update the target URL for /swiggy-menu route
const swiggyMenuProxy = createProxyMiddleware({
  target: process.env.SWIGGY_MENU_URL || "https://www.swiggy.com",
  changeOrigin: true,
  pathRewrite: {
    "^/swiggy-menu": "/dapi/menu/pl",
  },
});
