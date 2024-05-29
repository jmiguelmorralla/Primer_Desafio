import { Router } from "express";
import usersManager from "../../data/mongo/managers/UsersManager.mongo.js";
// import isValidData from "../../middlewares/isValidData.mid.js";
// import isValidEmail from "../../middlewares/isValidEmail.mid.js";
// import isValidUser from "../../middlewares/isValidUser.mid.js";
// import isValidPassword from "../../middlewares/isValidPassword.mid.js";
// import createHashPassword from "../../middlewares/createHashPassword.mid.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
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
sessionsRouter.post(
  "/login",
  // isValidUser,
  // isValidPassword,
  // passport.authenticate("login", isAuth, { session: false }),
  passportCb("login"),
  async (req, res, next) => {
    try {
      return res.cookie("token", req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: "Logged in.",
        // token: req.user.token,
      });
    } catch (error) {
      return next(error);
    }
  }
);
sessionsRouter.get(
  "/online",
  // passport.authenticate("jwt", { session: false }),
  passportCb("jwt"),
  async (req, res, next) => {
    try {
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is online!",
          user_id: req.session.user_id,
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
sessionsRouter.post("/signout", (req, res, next) => {
  console.log(req.session.email)
  try {
    if (req.session.email) {
      req.session.destroy();
      return res.json({ statusCode: 200, message: "Signed out." });
    }
    const error = new Error("Invalid credentials from signout...");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;
