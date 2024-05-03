import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", async (req, res, next) => {
  try {
    const carts=await cartsManager.read()
    console.log(carts)
    return res.render("carts", {carts});
  } catch (error) {
    return next(error);
  }
});

cartsRouter.get("/:cid", async(req, res, next) => {
    try {
        const {cid} = req.params
        const one = await cartsManager.readOne(cid)
        return res.render("cartdetails", {cart: one})
    } catch (error) {
        return next(error)
    }

})

export default cartsRouter;
