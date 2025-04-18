const CATALOGUE_BASE_URL = process.env.CATALOGUE_URL || "http://localhost:8081";

async function getProductById(id) {
  const res = await fetch(`${CATALOGUE_BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found`);
  return res.json();
}

async function getProductsByIds(ids) {
  return Promise.all(ids.map(getProductById));
}

module.exports = {
  getProductById,
  getProductsByIds,
};
