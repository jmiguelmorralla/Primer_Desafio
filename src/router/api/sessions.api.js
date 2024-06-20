import CustomRouter from "../CustomRouter.js";
// import { Router } from "express";
// import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
// import isValidData from "../../middlewares/isValidData.mid.js";
// import isValidEmail from "../../middlewares/isValidEmail.mid.js";
// import isValidUser from "../../middlewares/isValidUser.mid.js";
// import isValidPassword from "../../middlewares/isValidPassword.mid.js";
// import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

import {register, login, signout, online} from "../../controllers/sessions.controller.js"


class SessionsRouter extends CustomRouter {
  init() {
    this.create(
      "/register",
      ["PUBLIC"],
      // isValidData,
      // isValidEmail,
      // createHashPassword,
      // passport.authenticate("register", isAuth, { session: false }),
      passportCb("register"),

      register
    );

    this.create(
      "/login",
      ["PUBLIC"],
      // isValidUser,
      // isValidPassword,
      // passport.authenticate("login", isAuth, { session: false }),
      passportCb("login"),
      login
    );

    this.read(
      "/online",
      ["PUBLIC", "USER", "ADMIN"],
      // passport.authenticate("jwt", { session: false }),
      passportCb("jwt"),
      online
    );

    this.create(
      "/signout",
      ["USER", "ADMIN", "PUBLIC"],
      passportCb("jwt"),
      signout
    );
  }
}



const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
