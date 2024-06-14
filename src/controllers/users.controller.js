// import usersManager from "../data/mongo/managers/UsersManager.mongo.js";

import { createService, readService, readOneService, updateService, destroyService } from "../services/users.service.js"

class UserController {
  async readOne(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await readOneService(uid);
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

  async read(req, res, next) {
    try {
      const { role } = req.query;
      const all = await readService(role);
      if (all.length !== 0) {
        return res.status(200).json({
          response: all,
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

  async create(req, res, next) {
    try {
      const data = req.body;
      const one = await createService(data);
      return res.json({
        statusCode: 201,
        message: "User id: " + one._id + " created succesfully.",
      });
    } catch (error) {
      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { uid } = req.params;
      const data = req.body;
      const one = await updateService (uid, data);
      return res.json({
        statusCode: 200,
        response: one,
        message: "Updated one ID: " + one._id,
      });
    } catch (error) {
      return next(error);
    }
  }

  async destroy(req, res, next) {
    try {
      const { uid } = req.params;
      const one = await destroyService (uid);
      return res.json({
        statusCode: 200,
        response: one,
        message: "Deleted one ID: " + one._id,
      });
    } catch (error) {
      return next(error);
    }
  }
}

const usersController = new UserController();
const { create, read, readOne, update, destroy } = usersController;
export { create, read, readOne, update, destroy };
