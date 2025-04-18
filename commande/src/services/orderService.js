const Order = require("../models/Order");
const orderRepo = require("../repositories/orderRepository");
const catalogueClient = require("../clients/catalogueClient");

let lastOrderId = 0;

async function createOrder(productIds) {
  const products = await catalogueClient.getProductsByIds(productIds);
  const order = new Order(++lastOrderId, products);
  return orderRepo.save(order);
}

function getOrderById(id) {
  return orderRepo.findById(Number(id));
}

module.exports = {
  createOrder,
  getOrderById,
};
