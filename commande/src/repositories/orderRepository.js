const orders = new Map();

function save(order) {
  orders.set(order.id, order);
  return order;
}

function findById(id) {
  return orders.get(id);
}

module.exports = {
  save,
  findById,
};
