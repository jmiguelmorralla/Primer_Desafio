const fs = require("fs");
const crypto = require("crypto");

class UserManager {
  constructor() {
    this.path = "./fs/files/users.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Archivo Creado");
    } else {
      console.log("Archivo ya existe");
    }
  }

  async create(data) {
    // agregar try catch
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
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      users.push(user);
      console.log("Usuario Creado");
      users = JSON.stringify(users, null, 2);
      await fs.promises.writeFile(this.path, users);
    }
  }
  async read() {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users;
    // agregar try catch y condicional en caso de no encontrar usuarios
  }

  async readOne(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    return users.find((each) => each.id === id);
    // agregar try catch y condicional en caso de no encontrar usuario
  }

  async destroy(id) {
    let users = await fs.promises.readFile(this.path, "utf-8");
    users = JSON.parse(users);
    const filtered = users.filter((each) => each.id !== id);
    await fs.promises.writeFile(filtered);
    console.log(id + "eliminado");
    // agregar try catch y condicional en caso de no encontrar usuario
  }
}

async function test () {
    const gestorDeUsuarios = new UserManager();
    await gestorDeUsuarios.create({
      photo: "foto.jpg",
      email: "juan@gmail.com",
      password: "holapepito@",
      role: "admin",
    });
    
    await gestorDeUsuarios.create({
      photo: "fotoperfil.jpg",
      email: "cecilia@gmail.com",
      password: "Cecilia123",
      role: "user",
    });
    
    await gestorDeUsuarios.create({
      photo: "foto7.jpg",
      email: "carlos_m@gmail.com",
      password: "charly123",
      role: "user",
    });
    
    await gestorDeUsuarios.create({
      photo: "fotofrente.jpg",
      email: "donvictor@gmail.com",
      password: "vicky_@2",
      role: "admin",
    });
    console.log(await gestorDeUsuarios.read())
    console.log(await gestorDeUsuarios.readOne("f38ebd29531d97a6cf88a5a6"))
    
}

test()