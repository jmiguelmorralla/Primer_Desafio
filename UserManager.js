class UserManager {
  static #users = [];
  create(data) {
    const user = {
      id:
        UserManager.#users.length === 0
          ? 1
          : UserManager.#users[UserManager.#users.length - 1].id + 1,
      photo: data.photo,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    !data.photo || !data.email || !data.password || !data.role
      ? console.log("Usuario no creado. Ingrese todos los datos.")
      : UserManager.#users.push(user);
    console.log("Usuario Creado");
  }
  read() {
    return UserManager.#users;
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

console.log(gestorDeUsuarios.read());
