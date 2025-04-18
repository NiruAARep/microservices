const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/products.json");

// Lire les produits depuis le fichier JSON
function readProducts() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

// GET /products – retourne tous les produits
router.get("/", (req, res) => {
  const products = readProducts();
  res.json(products);
});

// GET /products/:id – retourne un produit par son ID
router.get("/:id", (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Produit non trouvé" });
  }
  res.json(product);
});

// POST /products – ajoute un produit
router.post("/", express.json(), (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(newProduct);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
  res.status(201).json(newProduct);
});

module.exports = router;