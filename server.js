import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import indexRouter from "./src/router/index.router.js";
import socketCb from "./src/router/index.socket.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import morgan from "morgan";
import __dirname from "./utils.js";
import { engine } from "express-handlebars";

// Server
const server = express();
const port = 8080;
const ready = () => console.log("Server ready on port: " + port + ".");
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

// Middlewares
server.use(express.urlencoded({ extended: true }));
// server.use(express.static(__dirname + "/public"));
server.use(express.json());
server.use(morgan("dev"));

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
