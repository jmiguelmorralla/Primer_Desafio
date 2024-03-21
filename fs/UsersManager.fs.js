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
      console.log("ARCHIVO CREADO");
    } else {
      console.log("ARCHIVO YA EXISTE");
    }
  }

  async create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueick0BA5tVSQJFjPJ49GPHAl30OzLnSjvRT_rpGv784YF5bCSHJ7V_qFVQ3aDkM2qlQ&usqp=CAU",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      if (!data.email || !data.password || !data.role) {
        console.log("USUARIO NO CREADO, INGRESE TODOS LOS DATOS REQUERIDOS.");
      } else {
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        console.log("Usuario Creado");
        users = JSON.stringify(users, null, 2);
        await fs.promises.writeFile(this.path, users);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      if (!users) {
        new Error("ERROR EN LA LECTURA DEL ARRAY");
      } else {
        return users;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id);
      console.log(user)
      if (!user) {
        throw new Error("NO EXISTE EL USUARIO.");
      } else {
        console.log(user)
      return user};

    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      let user = users.find((each) => each.id === id)
      if (!user) {
        throw new Error("NO EXISTEN USUARIOS CON ESE ID");
      } else {
        let filtered = users.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2)
        await fs.promises.writeFile(this.path, filtered);
        console.log("USUARIO " + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

async function testCreate() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.create({
    photo: "foto.jpg",
    email: "juan@gmail.com",
    password: "holapepito@",
    role: "admin",
  });

  await gestorDeUsuarios.create({
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
  console.log(await gestorDeUsuarios.read());
}


async function testRead() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.read()
  console.log(await gestorDeUsuarios.read())
}

async function testReadOne() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.readOne("0799b9ef85aac950d128ca3b")
  console.log(await gestorDeUsuarios.readOne())
}

async function testDestroy() {
  const gestorDeUsuarios = new UserManager();
  await gestorDeUsuarios.destroy("af10527386783c2c9a958a05")
  console.log(await gestorDeUsuarios.readOne())
}

// testCreate()
// testRead()
// testReadOne()
testDestroy()


