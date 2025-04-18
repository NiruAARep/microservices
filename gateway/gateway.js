const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.get("/", (req, res) => {
  res.send("Bienvenue sur l’API Gateway ! Utilisez /products ou /users.");
});

// Proxy vers microservice catalogue (en JS)
app.use('/products', createProxyMiddleware({
  target: 'http://catalogue:8081', // le nom du service Docker !
  changeOrigin: true
}));

// Proxy vers microservice users (en Go)
app.use('/users', createProxyMiddleware({
  target: 'http://users:8083',
  changeOrigin: true
}));

app.listen(3000, () => {
  console.log("API Gateway running at http://localhost:3000");
});
