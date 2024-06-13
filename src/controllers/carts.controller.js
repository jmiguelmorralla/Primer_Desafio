import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";

async function create(req, res, next) {
    try {
      const data = req.body;
      console.log(data)
      data.user_id = req.user._id;
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
  }
  
  async function read(req, res, next) {
    try {
      const user_id = req.user._id;
      const all = await cartsManager.read({ user_id });
      if (all.length > 0) {
        return res.response200(all);
      } else {
        const error = new Error("Not found!");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      return next(error);
    }
  }
  
  async function readOne(req, res, next) {
    try {
      const { cid } = req.params;
      const one = await cartsManager.readOne(cid);
      if (one) {
        return res.response200(one);
      } else {
        const error = new Error("Not found!");
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
        message: "Updated cart ID: " + one._id,
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


  export { create, read, readOne, update, destroy }