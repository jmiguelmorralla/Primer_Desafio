import CustomRouter from "../CustomRouter.js";
// import { Router } from "express";
// import usersManager from "../../data/fs/UsersManager.fs.js";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";

import { create, read, readOne, update, destroy} from "../../controllers/users.controller.js"


class UsersRouter extends CustomRouter {
  init() {
    this.read("/:uid", ["ADMIN"], readOne);
    this.read("/", ["ADMIN"], read);
    this.create("/", ["USER", "ADMIN"], create);
    this.update("/:uid", ["ADMIN"], update);
    this.destroy("/:uid", ["ADMIN"], destroy);

  }
}

const usersRouter = new UsersRouter();


export default usersRouter.getRouter();
