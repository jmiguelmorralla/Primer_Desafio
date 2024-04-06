import usersManager from "../data/fs/UsersManager.fs.js";

export default async (socket) => {
  console.log("client socket " + socket.id);
  socket.emit("users", await usersManager.read());
};
