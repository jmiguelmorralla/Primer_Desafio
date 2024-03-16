const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "./fs/files/products.json";
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
      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo:
          data.photo ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
        category: data.category,
        price: data.price,
        stock: data.stock,
      };

      if (!data.stock || !data.title || !data.category || !data.price) {
        console.log("PRODUCTO NO CREADO, INGRESE TODOS LOS DATOS REQUERIDOS.");
      } else {
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Producto Creado");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async read() {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      if (!products) {
        new Error("ERROR EN LA LECTURA DEL ARRAY");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async readOne(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const product = products.find((each) => each.id === id);
      if (!product) {
        throw new Error("NO EXISTE EL PRODUCTO.");
      }
      return producto;
    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const filtered = products.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("NO EXISTEN PRODUCTOS CON ESE ID");
      }
      else {
        await fs.promises.writeFile(filtered);
        console.log("PRODUCTO " + id + " ELIMINADO");
      }

    } catch (error) {
      console.log(error)
    }
  }
}

async function test() {
  const gestorDeProductos = new ProductManager();

  await gestorDeProductos.create({
    photo: "foto55.jpg",
    title: "Balancin",
    category: "madera",
    price: 15000,
    stock: 41,
  });

  await gestorDeProductos.create({
    photo: "foto7.jpg",
    title: "Bloques",
    category: "plastico",
    price: 7000,
    stock: 36,
  });

  await gestorDeProductos.create({
    title: "Casita",
    category: "madera",
    price: 6500,
    stock: 22,
  });

  await gestorDeProductos.create({
    photo: "luna4.jpg",
    title: "Luna",
    category: "madera",
    price: 7500,
    stock: 39,
  });

  await gestorDeProductos.create({
    photo: "arcoiris.jpg",
    title: "Arcoiris",
    category: "madera",
    price: 7000,
    stock: 36,
  });

  await gestorDeProductos.create({
    title: "Pajarito",
    category: "tela",
    price: 6,
    stock: 18,
  });

  await gestorDeProductos.create({
    photo: "foto1.jpg",
    title: "Piramide",
    category: "madera",
    price: 9500,
    stock: 21,
  });

  await gestorDeProductos.create({
    photo: "foto344.jpg",
    title: "Auto",
    category: "madera",
    price: 9900,
    stock: 12,
  });

  await gestorDeProductos.create({
    photo: "Titere.jpg",
    title: "Titere",
    category: "tela",
    price: 4600,
    stock: 36,
  });

  await gestorDeProductos.create({
    photo: "serpiente.jpg",
    title: "Serpiente",
    category: "tela",
    price: 7000,
    stock: 7,
  });

  console.log(await gestorDeProductos.read());
}

test();

