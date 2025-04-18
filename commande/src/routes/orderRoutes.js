const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/orders.json");
const CATALOGUE_URL = process.env.CATALOGUE_URL || "http://localhost:8081";

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

router.post("/", express.json(), (req, res) => {
  const productIds = req.body.productIds;
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res
      .status(400)
      .json({ message: "productIds must be a non-empty array" });
  }
  Promise.all(
    productIds.map((id) =>
      fetch(`${CATALOGUE_URL}/products/${id}`).then((resp) => {
        if (!resp.ok) throw new Error(`Produit ${id} introuvable`);
        return resp.json();
      })
    )
  )
    .then((products) => {
      const orders = readOrders();
      const newOrder = {
        id: orders.length + 1,
        products: products,
        createdAt: new Date().toISOString(),
      };
      orders.push(newOrder);
      fs.writeFileSync(filePath, JSON.stringify(orders, null, 2));
      res.status(201).json(newOrder);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
});

module.exports = router;
