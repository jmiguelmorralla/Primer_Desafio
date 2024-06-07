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
      async (req, res, next) => {
        try {
          // const data = req.body;
          // await usersManager.create(data);
          return res.json({ statusCode: 201, message: "Registered." });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create(
      "/login",
      ["PUBLIC"],
      // isValidUser,
      // isValidPassword,
      // passport.authenticate("login", isAuth, { session: false }),
      passportCb("login"),
      async (req, res, next) => {
        try {
          return res
            .cookie("token", req.user.token, { signedCookie: true })
            // .json({
            //   statusCode: 200,
            //   message: "Logged in.",
            //   // token: req.user.token,
            // });
            .message200("Logged in!");
        } catch (error) {
          return next(error);
        }
      }
    );
    this.read(
      "/online",
      ["USER", "ADMIN"],
      // passport.authenticate("jwt", { session: false }),
      passportCb("jwt"),
      async (req, res, next) => {
        try {
          if (req.user.online) {
            return res.json({
              statusCode: 200,
              message: "Is online!",
              user_id: req.user._id,
              email: req.user.email,
              photo: req.user.photo
            });
          }
          return res.json({
            statusCode: 401,
            message: "Bad auth!",
          });
        } catch (error) {
          return next(error);
        }
      }
    );
    this.create("/signout",  ["USER", "ADMIN", "PUBLIC"], passportCb("jwt"), (req, res, next) => {
      try {
        console.log(req.user.email)
 
        if (req.user.email) {
        return res.clearCookie("token").json({ statusCode:200, message: "Signed out." })};
        const error = new Error("Invalid credentials from signout...");
        error.statusCode = 401;
        throw error;
      } catch (error) {
        return next(error);
      }

    });
  }
}
const sessionsRouter = new SessionsRouter();

export default sessionsRouter.getRouter();
