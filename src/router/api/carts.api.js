import { Router } from "express";
import cartsManager from "../../data/mongo/managers/CartsManager.mongo.js";

const cartsRouter = Router();

cartsRouter.post("/", create);
cartsRouter.get("/", read);
cartsRouter.get("/:cid", readOne);
cartsRouter.put("/:cid", update);
cartsRouter.delete("/:cid", destroy);

async function create (req, res, next) {
  try {
    const data = req.body;
    data.user_id = req.session.user_id
    // product_id
    // quantity
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "Created.",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
};

async function read (req, res, next) {
  try {
    const { user_id } = req.session;
    if (user_id) {
      const all = await cartsManager.read({ user_id });
      if (all.length > 0) {
        return res.json({
          statusCode: 200,
          message: "Read.",
          response: all,
        });
      }
    }
    const error = new Error("Not found.");
    error.statusCode = 404;
    throw error;
  } catch (error) {
    return next(error);
  }
};



async function readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await cartsManager.readOne(uid);
      if (one) {
        return res.status(200).json({
          response: one,
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


async function update(req, res, next) {
    try {
      const { cid } = req.params;
      const data = req.body;
      const one = await cartsManager.update(cid, data);
      return res.json({
        statusCode: 200,
        response: one,
        message: "Updated cart ID: " + one.id,
      });
    } catch (error) {
      return next(error);
    }
}

async function destroy(req, res, next) {
    try {
      const { cid } = req.params;
      const one = await cartsManager.destroy(cid);
      return res.json({
        statusCode: 200,
        response: one,
        message: "Deleted cart ID.: " + one._id,
      });
    } catch (error) {
      return next(error);
    }
  }
export default cartsRouter;
