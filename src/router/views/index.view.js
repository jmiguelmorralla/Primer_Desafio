import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";
import cartsRouter from "./carts.view.js"
import productsManager from "../../data/mongo/managers/ProductsManager.mongo.js";


const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.use("/carts", cartsRouter);

viewsRouter.get("/", async(req, res, next) => {
  try {
    const products = await productsManager.paginate({filter:{}, opts:{lean: true}})
    console.log(products)
    return res.render("index", {title: "Home", products: products.docs})
    
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;
