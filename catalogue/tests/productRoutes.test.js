const fs = require("fs");

jest.mock("fs");

const mockRouter = {
  get: jest.fn(),
  post: jest.fn(),
};

jest.mock("express", () => {
  const jsonMiddleware = jest.fn(() => (req, res, next) => next());

  return {
    Router: jest.fn(() => mockRouter),
    json: jsonMiddleware,
  };
});

jest.mock("path", () => ({
  join: jest.fn().mockReturnValue("chemin/fictif/products.json"),
}));

const productRoutes = require("../routes/products");

const mockProducts = [
  { id: 1, name: "Stylo", price: 1.5 },
  { id: 2, name: "Cahier", price: 3.0 },
];

describe("Product Routes - GET /", () => {
  let routeHandler;
  let req, res;

  beforeEach(() => {
    routeHandler = mockRouter.get.mock.calls.find((call) => call[0] === "/")[1];

    req = {};
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockProducts));
  });

  test("GET / devrait renvoyer tous les produits", () => {
    routeHandler(req, res);
    expect(fs.readFileSync).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockProducts);
  });
});

describe("Product Routes - GET /:id", () => {
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

    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockProducts));
  });

  test("GET /:id devrait renvoyer le produit correspondant si trouvé", () => {
    req.params.id = "1";
    routeHandler(req, res);
    expect(res.json).toHaveBeenCalledWith(mockProducts[0]);
  });

  test("GET /:id devrait renvoyer 404 si le produit n'existe pas", () => {
    req.params.id = "999";
    routeHandler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Produit non trouvé" });
  });
});

describe("Product Routes - POST /", () => {
  let routeHandler, middlewareHandler;
  let req, res, next;

  beforeEach(() => {
    const postCall = mockRouter.post.mock.calls.find((call) => call[0] === "/");
    middlewareHandler = postCall[1];
    routeHandler = postCall[2];

    req = {
      body: {
        name: "Nouveau Produit",
        price: 9.99,
      },
    };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    next = jest.fn();

    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(mockProducts));
    fs.writeFileSync = jest.fn();
  });

  test("POST / devrait ajouter un nouveau produit", () => {
    routeHandler(req, res);

    const expectedNewProduct = {
      id: mockProducts.length + 1,
      name: "Nouveau Produit",
      price: 9.99,
    };

    expect(fs.readFileSync).toHaveBeenCalled();
    expect(fs.writeFileSync).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expectedNewProduct);

    const writeCall = fs.writeFileSync.mock.calls[0];
    const writtenData = JSON.parse(writeCall[1]);
    expect(writtenData.length).toBe(mockProducts.length + 1);
    expect(writtenData[writtenData.length - 1]).toEqual(expectedNewProduct);
  });
});
