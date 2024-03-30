import express from "express";
import indexRouter from "./src/router/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";

// Server
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port: " + port + ".");

server.listen(port, ready);

// Middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use("/", indexRouter)
server.use(errorHandler)
server.use(pathHandler)
