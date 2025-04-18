const express = require("express");
const app = express();
const productsRoutes = require("./routes/products");

const PORT = 8081;

app.use("/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Catalogue service running at http://localhost:${PORT}`);
});
