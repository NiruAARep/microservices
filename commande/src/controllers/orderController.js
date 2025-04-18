const orderService = require("../services/orderService");

async function createOrder(req, res) {
  const { productIds } = req.body;
  if (!Array.isArray(productIds) || productIds.length === 0) {
    return res
      .status(400)
      .json({ message: "productIds must be a non-empty array" });
  }
  try {
    const order = await orderService.createOrder(productIds);
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

function getOrder(req, res) {
  const order = orderService.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
}

module.exports = { createOrder, getOrder };
