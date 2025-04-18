const fs = require("fs");

jest.mock("fs");
jest.mock("path", () => ({
  join: jest.fn().mockReturnValue("chemin/fictif/orders.json"),
}));

const mockRouter = {
  get: jest.fn(),
  post: jest.fn(),
};

jest.mock("express", () => ({
  Router: jest.fn(() => mockRouter),
}));


const orderRoutes = require("../src/routes/orderRoutes");

const mockOrders = [
  {
    id: 1,
    products: [{ id: 1, name: "Stylo", price: 1.5 }],
    createdAt: "2025-04-18T12:00:00.000Z",
  },
  {
    id: 2,
    products: [{ id: 2, name: "Cahier", price: 3.0 }],
    createdAt: "2025-04-18T12:10:00.000Z",
  },
];

describe("Order Routes - GET /", () => {
  let routeHandler;
  let req, res;

  beforeEach(() => {
    routeHandler = mockRouter.get.mock.calls.find((call) => call[0] === "/")[1];

    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockOrders));
  });

  test("GET / devrait renvoyer toutes les commandes", () => {
    routeHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(mockOrders);
  });
});

describe("Order Routes - GET /:id", () => {
  let routeHandler;
  let req, res;

  beforeEach(() => {
    routeHandler = mockRouter.get.mock.calls.find(
      (call) => call[0] === "/:id"
    )[1];

    req = { params: {} };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    fs.existsSync = jest.fn().mockReturnValue(true);
    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockOrders));
  });

  test("GET /:id devrait renvoyer la commande correspondante si elle existe", () => {
    req.params.id = "1"; 

    routeHandler(req, res);

    expect(res.json).toHaveBeenCalledWith(mockOrders[0]);
  });

  test("GET /:id devrait renvoyer 404 si la commande n'existe pas", () => {
    req.params.id = "999"; 

    routeHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Commande non trouvée" });
  });
});
