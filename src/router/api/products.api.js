import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import productsManager from "../../data/mongo/ProductsManager.mongo.js";

const productsRouter = Router();

productsRouter.get("/:pid", readOne);
productsRouter.get("/", read);
productsRouter.post("/", create); 
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function readOne(req, res, next) {
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
    return next(error);
  }
}

async function read(req, res, next) {
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
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const product = await productsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Product id: " + product.id + " created succesfully.",
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
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
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { pid } = req.params;
    const product = await productsManager.destroy(pid);
    return res.json({
      statusCode: 200,
      response: product,
      message: "Deleted product ID: " + product.id,
    });
  } catch (error) {
    return next(error);
  }
}

export default productsRouter;
