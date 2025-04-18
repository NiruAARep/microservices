const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/orders.json");

function readOrders() {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

router.get("/", (req, res) => {
  const orders = readOrders();
  res.json(orders);
});

router.get("/:id", (req, res) => {
  const orders = readOrders();
  const order = orders.find((o) => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }
  res.json(order);
});

router.post("/", (req, res) => {
  const productIds = req.body.productIds;
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({
      message: "Les IDs de produits sont requis et doivent être un tableau.",
    });
  }
  const orders = readOrders();
  const newOrder = {
    id: orders.length + 1,
    products: productIds,
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
  res.status(201).json(newOrder);
});

module.exports = router;
