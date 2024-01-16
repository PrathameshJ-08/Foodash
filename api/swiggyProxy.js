// api/swiggyProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

export default createProxyMiddleware({
  target: "https://www.swiggy.com",
  changeOrigin: true,
  pathRewrite: {
    "^/swiggy-api": "/dapi/restaurants/list/v5",
    "^/swiggy-menu": "/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true",
  },
});
