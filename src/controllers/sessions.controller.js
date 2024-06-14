class SessionsController {
  async register(req, res, next) {
    try {
      // const data = req.body;
      // await usersManager.create(data);
      return res.json({ statusCode: 201, message: "Registered." });
    } catch (error) {
      return next(error);
    }
  }

  async login(req, res, next) {
    try {
      return (
        res
          .cookie("token", req.user.token, { signedCookie: true })
          // .json({
          //   statusCode: 200,
          //   message: "Logged in.",
          //   // token: req.user.token,
          // });
          .message200("Logged in!")
      );
    } catch (error) {
      return next(error);
    }
  }

  async online(req, res, next) {
    try {
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: "Is online!",
          user_id: req.user._id,
          email: req.user.email,
          photo: req.user.photo,
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

  signout(req, res, next) {
    try {
      console.log(req.user.email);

      if (req.user.email) {
        return res
          .clearCookie("token")
          .json({ statusCode: 200, message: "Signed out." });
      }
      const error = new Error("Invalid credentials from signout...");
      error.statusCode = 401;
      throw error;
    } catch (error) {
      return next(error);
    }
  }
}

const sessionsController = new SessionsController();
const { register, login, signout, online } = sessionsController;

export { register, login, signout, online };
