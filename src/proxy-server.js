const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = process.env.PORT || 3001;

// Use CORS middleware
app.use(cors());

// Logging middleware (optional)
app.use((req, res, next) => {
  console.log(`Proxying request: ${req.method} ${req.url}`);
  next();
});

app.use(
  "/swiggy-api",
  createProxyMiddleware({
    target: "https://www.swiggy.com",
    changeOrigin: true,
    pathRewrite: {
      "^/swiggy-api": "/dapi/restaurants/list/v5",
    },
  })
);

app.use(
  "/swiggy-menu",
  createProxyMiddleware({
    target: "https://www.swiggy.com",
    changeOrigin: true,
    pathRewrite: {
      "^/swiggy-menu": "/dapi/menu/pl",
    },
  })
);

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
