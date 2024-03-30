import express from "express";
import indexRouter from "./src/router/index.router.js";

// Server
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port: " + port + ".");

server.listen(port, ready);

// Middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Router
server.use("/", indexRouter)


// server.get("/", async (req, res) => {
//   try {
//     return res.status(200).json({
//       response: "Correct reading.",
//       success: true,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({
//       response: "Null",
//       message: error.message || "Api error.",
//       success: false,
//     });
//   }
// });








