// api/swiggyProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

export default createProxyMiddleware({
  target: "https://www.swiggy.com",
  changeOrigin: true,
  pathRewrite: {
    "^/api/swiggy-api": "/dapi/restaurants/list/v5",
    "^/api/swiggy-menu":
      "/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true",
  },
});
