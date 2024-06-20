import CustomRouter from "../CustomRouter.js";
// import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import { readOne, read, paginate, create, update, destroy } from "../../controllers/products.controller.js"
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

class ProductsRouter extends CustomRouter {
  init() {
    // ENDPOINTS
    this.read("/", ["PUBLIC"], read);
    this.read("/paginate", ["PUBLIC"], paginate);
    this.read("/:pid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], isValidAdmin, create);
    this.update("/:pid", ["ADMIN"], update);
    this.destroy("/:pid", ["ADMIN"], destroy);

  }
}

const productsRouter = new ProductsRouter();

export default productsRouter.getRouter()


