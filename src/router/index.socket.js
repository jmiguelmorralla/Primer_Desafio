import usersManager from "../data/fs/UsersManager.fs.js";
import productsManager from "../data/fs/ProductsManager.fs.js";

export default async (socket) => {
  console.log("client socket " + socket.id);
  socket.emit("users", await usersManager.read());
  socket.emit("products", await productsManager.read())
};
