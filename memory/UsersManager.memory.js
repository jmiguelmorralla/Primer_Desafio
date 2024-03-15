const crypto = require("crypto");

class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id: crypto.randomBytes(12).toString("hex"),
      photo: data.photo || "url",
      email: data.email,
      password: data.password,
      role: data.role,
    };

    if (!data.email || !data.password || !data.role) {
      console.log("Usuario no creado. Ingrese todos los datos.");
    } else {
      UserManager.#users.push(user);
      console.log("Usuario Creado");
    }
  }
  read() {
    try {
      const users = UserManager.#users;
      if (!users) {
        throw new Error("NO EXISTEN USUARIOS");
      } else {
        return users;
      }
    } catch (error) {
      console.log("no existen usuarios");
    }

  }

  readOne(id) {
    try {
      const one = UserManager.#users.find((each) => each.id === id);
      if (!one) {
        throw new Error("NO EXISTE EL USUARIO");
      } else {
        return one;
      }
    } catch (error) {
      console.log(error);
    }
  }

  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (!filtered) {
        throw new Error("NO EXISTEN USUARIOS)");
      } else {
        UserManager.#users = filtered;
        console.log(id + "eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeUsuarios = new UserManager();
gestorDeUsuarios.create({
  photo: "foto.jpg",
  email: "juan@gmail.com",
  password: "holapepito@",
  role: "admin",
});

gestorDeUsuarios.create({
  photo: "fotoperfil.jpg",
  email: "cecilia@gmail.com",
  password: "Cecilia123",
  role: "user",
});

gestorDeUsuarios.create({
  photo: "foto7.jpg",
  email: "carlos_m@gmail.com",
  password: "charly123",
  role: "user",
});

gestorDeUsuarios.create({
  photo: "fotofrente.jpg",
  email: "donvictor@gmail.com",
  password: "vicky_@2",
  role: "admin",
});

console.log(gestorDeUsuarios.read());
