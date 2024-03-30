import { Router } from "express";
import usersManager from "../../data/fs/UsersManager.fs.js";

const usersRouter = Router();

usersRouter.get("/:uid", readOne);
usersRouter.get("/", read);
usersRouter.post("/", create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

async function readOne(req, res, next) {
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
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { role } = req.query;
    const users = await usersManager.read(role);
    if (users.length !== 0) {
      return res.status(200).json({
        response: users,
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
    return next(error);
  }
}

async function create(req, res, next) {
  try {
    const data = req.body;
    const user = await usersManager.create(data);
    return res.json({
      statusCode: 201,
      message: "User id: " + user.id + " created succesfully.",
    });
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const data = req.body;
    const user = await usersManager.update(uid, data);
    return res.json({
      statusCode: 200,
      response: user,
      message: "Updated user ID: " + user.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const user = await usersManager.destroy(uid);
    return res.json({
      statusCode: 200,
      response: user,
      message: "Deleted user ID: " + user.id,
    });
  } catch (error) {
    return next(error);
  }
}

export default usersRouter;
