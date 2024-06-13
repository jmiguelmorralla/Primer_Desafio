import CustomRouter from "../CustomRouter.js";
// import { Router } from "express";
import { create, read, readOne, update, destroy } from "../../controllers/carts.controller.js"

class CartsRouter extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN"], create);
    this.read("/", ["USER", "ADMIN"], read);
    this.read("/:cid", ["USER", "ADMIN"], readOne);
    this.update("/:cid", ["USER", "ADMIN"], update);
    this.destroy("/:cid", ["USER", "ADMIN"], destroy);
  }
}

const cartsRouter = new CartsRouter();

export default cartsRouter.getRouter();
