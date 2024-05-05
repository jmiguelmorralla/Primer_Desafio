// import usersManager from "../data/fs/UsersManager.fs.js";
// import productsManager from "../data/fs/ProductsManager.fs.js";
import usersManager from "../data/mongo/managers/UsersManager.mongo.js";
import productsManager from "../data/mongo/managers/ProductsManager.mongo.js";
import cartsManager from "../data/mongo/managers/CartsManager.mongo.js";

export default async (socket) => {
  console.log("client socket " + socket.id);
  socket.emit("users", await usersManager.read());
  socket.emit("products", await productsManager.read());
  // socket.emit("carts", await cartsManager.read());
  socket.on("newProduct", async data=>{
    await productsManager.create(data)
    socket.emit("products", await productsManager.read());
  })
  socket.on("newUser", async data=>{
    await usersManager.create(data)
    socket.emit("users", await usersManager.read());
  })
};
