const app = require("./src/app");

const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Commande service running on port ${PORT}`);
});
