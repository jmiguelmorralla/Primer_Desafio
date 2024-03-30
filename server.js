import express from "express";
import usersManager from "./data/fs/UsersManager.fs.js";
import productsManager from "./data/fs/ProductsManager.fs.js";

// Server
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port: " + port + ".");

server.listen(port, ready);

// Middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Router
server.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      response: "Correct reading.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      response: "Null",
      message: error.message || "Api error.",
      success: false,
    });
  }
});

server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const products = await productsManager.read(category);
    if (products.length !== 0) {
      return res.status(200).json({
        response: products,
        codeStatus: 200,
        category,
        success: true,
      });
    } else {
      const error = new Error("Not found.");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: null,
      message: error.message || "Api Error.",
      codeStatus: error.statusCode || 500,
      success: false,
    });
  }
});

const create = async (req, res) => {
  try {
    const data = req.body;
    const product = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Product id: " + product.id + " created succesfully.",
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "Api Error.",
    });
  }
};

const update = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = req.body;
    const product = await productsManager.update(pid, data);
    return res.json({
      statusCode: 200,
      response: product,
      message: "Updated product ID: " + product.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "Api Error.",
    });
  }
};

const destroy = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: product,
      message: "Deleted product ID: " + product.id,
    });
  } catch (error) {
    return res.json({
      statusCode: error.statusCode || 500,
      message: error.message || "Api Error.",
    });
  }
};


server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.readOne(pid);
    if (product) {
      return res.status(200).json({
        response: product,
        success: true,
      });
    } else {
      const error = new Error("Not found.");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message,
      codeStatus: error.statusCode,
      success: false,
    });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const all = await usersManager.read(role);
    if (all.length !== 0) {
      return res.status(200).json({
        response: all,
        codeStatus: 200,
        role,
        success: true,
      });
    } else {
      const error = new Error("Not found.");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: null,
      message: error.message || "Api Error",
      codeStatus: error.statusCode || 500,
      success: false,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersManager.readOne(uid);
    if (user) {
      return res.status(200).json({
        response: user,
        success: true,
      });
    } else {
      const error = new Error("Not found.");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      response: error.message || "Api Error.",
      codeStatus: error.statusCode || 500,
      success: false,
    });
  }
});

server.post("/api/products", create);

server.put("/api/products/:pid", update);

server.delete("/api/products/:pid", destroy);
