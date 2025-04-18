const express = require("express");
const orderRoutes = require("./src/routes/orderRoutes");

const app = express();
app.use(express.json());
app.use("/orders", orderRoutes);

const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Commande service running on port ${PORT}`);
});
