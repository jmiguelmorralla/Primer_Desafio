import CustomRouter from "../CustomRouter.js";
// import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

class ProductsRouter extends CustomRouter {
init() {
// ENDPOINTS
this.read("/", read);
this.read("/paginate", paginate);
this.read("/:pid", readOne);
this.create("/", isValidAdmin, create);
this.update("/:pid", update);
this.destroy("/:pid", destroy);
}
}

const productsRouter = new ProductsRouter();


// FUNCIONES PARA LOS ENDPOINTS
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

async function paginate(req, res, next) {
  try {
    const filter = {};
    const opts = {};
    if (req.query.limit) {
      opts.limit = req.query.limit;
    }
    if (req.query.page) {
      opts.page = req.query.page;
    }
    if (req.query.user_id) {
      filter.user_id = req.query.user_id;
    }

    const all = await productsManager.paginate({ filter, opts });
    return res.json({
      statusCode: 200,
      response: all.docs,
      info: {
        page: all.page,
        totalPages: all.totalPages,
        limit: all.limit,
        prevPage: all.prevPage,
        nextPage: all.nextPage,
      },
    });
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
      message: "Product id: " + product._id + " created succesfully.",
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
      message: "Updated product ID: " + product._id,
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
      message: "Deleted product ID: " + product._id,
    });
  } catch (error) {
    return next(error);
  }
}

export default this;
