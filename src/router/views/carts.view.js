import { Router } from "express";
// import productsManager from "../../data/fs/ProductsManager.fs.js";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.get("/", async (req, res, next) => {
  try {
    const {user_id} = req.query
    const carts=await cartsManager.read({user_id})
    return res.render("carts", {carts});
  } catch (error) {
    return next(error);
  }
});

cartsRouter.get("/:cid", async(req, res, next) => {
    try {
        const {cid} = req.params
        const carts = await cartsManager.read(cid)
        return res.render("carts", {carts: carts})
    } catch (error) {
        return next(error)
    }

})

export default cartsRouter;
