import fs from "fs";
import crypto from "crypto";

class ProductManager {
  constructor() {
    this.path = "./src/data/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
      console.log("Created file.");
    } else {
      console.log("File already exists.");
    }
  }

  async create(data) {
    try {
      if (!data.title) {
        throw new Error("Not created product. Please complete TITLE.");
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo:
            data.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9FfpvUvCBmocfYGwa-EdrH-GEnOaAfmS3aQ&usqp=CAU",
          category: data.category || "plastico",
          price: data.price || 1,
          stock: data.stock || 1,
        };

        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Product created succesfully.");
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
  async read(cat) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      cat && (products = products.filter((each) => each.category === cat));
      if (!products) {
        new Error("Error at reading array.");
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
      let product = products.find((each) => each.id === id);
      console.log(product);
      if (!product) {
        throw new Error("Product does not exist.");
      } else {
        console.log(product);
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, data) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id);
      if (product) {
        for (let prop in data) {
          product[prop] = data[prop];
        }
        products = JSON.stringify(products, null, 2);
        await fs.promises.writeFile(this.path, products);
        return product;
      } else {
        const error = new Error("Not product found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id);
      if (!product) {
        const error = new Error("Product does not exist.");
        error.statusCode = 404;
        throw error;
      } else {
        let filtered = products.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " product.");
        return product;
      }
    } catch (error) {
      throw error;
    }
  }
}

async function testCreate() {
  const productManager = new ProductManager();

  await productManager.create({
    photo: "foto55.jpg",
    title: "Balancin",
    category: "madera",
    price: 15000,
    stock: 41,
  });

  await productManager.create({
    photo: "foto7.jpg",
    title: "Bloques",
    category: "plastico",
    price: 7000,
    stock: 36,
  });

  await productManager.create({
    title: "Casita",
    category: "madera",
    price: 6500,
    stock: 22,
  });

  await productManager.create({
    photo: "luna4.jpg",
    title: "Luna",
    category: "madera",
    price: 7500,
    stock: 39,
  });

  await productManager.create({
    photo: "arcoiris.jpg",
    title: "Arcoiris",
    category: "madera",
    price: 7000,
    stock: 36,
  });

  await productManager.create({
    title: "Pajarito",
    category: "tela",
    price: 6,
    stock: 18,
  });

  await productManager.create({
    photo: "foto1.jpg",
    title: "Piramide",
    category: "madera",
    price: 9500,
    stock: 21,
  });

  await productManager.create({
    photo: "foto344.jpg",
    title: "Auto",
    category: "madera",
    price: 9900,
    stock: 12,
  });

  await productManager.create({
    photo: "Titere.jpg",
    title: "Titere",
    category: "tela",
    price: 4600,
    stock: 36,
  });

  await productManager.create({
    photo: "serpiente.jpg",
    title: "Serpiente",
    category: "tela",
    price: 7000,
    stock: 7,
  });

  await productManager.create({
    photo: "foto5.jpg",
    title: "Tobogan",
    category: "plastico",
    price: 45000,
    stock: 15,
  });

  await productManager.create({
    photo: "fotom.jpg",
    title: "Muneca",
    category: "plastico",
    price: 7200,
    stock: 40,
  });

  await productManager.create({
    title: "Perro",
    category: "madera",
    price: 3500,
    stock: 20,
  });

  await productManager.create({
    photo: "Elefante.jpg",
    title: "Elefante",
    category: "madera",
    price: 8500,
    stock: 60,
  });

  await productManager.create({
    photo: "Tigre.jpg",
    title: "Tigre",
    category: "madera",
    price: 7000,
    stock: 7,
  });

  await productManager.create({
    title: "Barco",
    category: "plastico",
    price: 5000,
    stock: 25,
  });

  await productManager.create({
    photo: "foto13244.jpg",
    title: "Bolitas",
    category: "vidrio",
    price: 3500,
    stock: 20,
  });

  await productManager.create({
    photo: "foto34111.jpg",
    title: "Raton",
    category: "tela",
    price: 3000,
    stock: 10,
  });

  await productManager.create({
    photo: "doctor.jpg",
    title: "Kit medico",
    category: "plastico",
    price: 6600,
    stock: 3,
  });

  await productManager.create({
    photo: "animales.jpg",
    title: "Animalitos",
    category: "plastico",
    price: 4600,
    stock: 15,
  });

  await productManager.create({
    photo: "toy1.jpg",
    title: "Muneca de trapo",
    category: "tela",
    price: 7300,
    stock: 50,
  });

  await productManager.create({
    photo: "toy2.jpg",
    title: "Bloques de construccion",
    category: "madera",
    price: 8500,
    stock: 30,
  });

  await productManager.create({
    photo: "toy3.jpg",
    title: "Carro control remoto",
    category: "plastico",
    price: 6700,
    stock: 20,
  });

  await productManager.create({
    photo: "toy4.jpg",
    title: "Puzzle 1000 piezas",
    category: "madera",
    price: 9300,
    stock: 40,
  });

  await productManager.create({
    photo: "toy5.jpg",
    title: "Pelota de futbol",
    category: "plastico",
    price: 5200,
    stock: 60,
  });

  await productManager.create({
    photo: "toy6.jpg",
    title: "Cocinita de juguete",
    category: "metal",
    price: 17600,
    stock: 25,
  });

  await productManager.create({
    photo: "toy7.jpg",
    title: "Avion de juguete",
    category: "plastico",
    price: 5800,
    stock: 35,
  });

  await productManager.create({
    photo: "toy8.jpg",
    title: "Muneco articulado",
    category: "metal",
    price: 14900,
    stock: 45,
  });

  await productManager.create({
    photo: "toy9.jpg",
    title: "Juego de te de juguete",
    category: "plastico",
    price: 7300,
    stock: 30,
  });

  await productManager.create({
    photo: "toy10.jpg",
    title: "Kit ciencia experimentos",
    category: "plastico",
    price: 12700,
    stock: 25,
  });

  await productManager.create({
    photo: "toy11.jpg",
    title: "Peluche de animal",
    category: "tela",
    price: 9200,
    stock: 40,
  });

  await productManager.create({
    photo: "toy12.jpg",
    title: "Juego de mesa clasico",
    category: "madera",
    price: 10100,
    stock: 35,
  });

  await productManager.create({
    photo: "toy13.jpg",
    title: "Robot transformable",
    category: "metal",
    price: 16200,
    stock: 20,
  });

  await productManager.create({
    photo: "toy14.jpg",
    title: "Tren de juguete",
    category: "metal",
    price: 8700,
    stock: 30,
  });

  await productManager.create({
    photo: "toy15.jpg",
    title: "Set de plastilina",
    category: "plastico",
    price: 5400,
    stock: 50,
  });

  await productManager.create({
    photo: "toy16.jpg",
    title: "Pelota de baloncesto",
    category: "plastico",
    price: 7800,
    stock: 40,
  });

  await productManager.create({
    photo: "toy17.jpg",
    title: "Dinosaurio de juguete",
    category: "plastico",
    price: 6900,
    stock: 55,
  });

  await productManager.create({
    photo: "toy18.jpg",
    title: "Set de pinturas y pinceles",
    category: "plastico",
    price: 6400,
    stock: 30,
  });

  await productManager.create({
    photo: "toy19.jpg",
    title: "Kit construccion vehiculos",
    price: 17800,
  });

  await productManager.create({
    title: "Instrumento musical juguete",
    category: "tela",
  });

  console.log(await productManager.read());
}

async function testRead() {
  const productManager = new ProductManager();
  await productManager.read();
  console.log(await productManager.read());
}

async function testReadOne() {
  const productManager = new ProductManager();
  await productManager.readOne("");
  console.log(await productManager.readOne());
}

async function testUpdate() {
  const productManager = new ProductManager();
  await productManager.update("");
  console.log(await productManager.update("20912fd7680981dd0ee12351"));
}

async function testDestroy() {
  const productManager = new ProductManager();
  await productManager.destroy("");
  console.log(await productManager.destroy());
}

// testRead()
// testReadOne()
// testUpdate()
// testDestroy()

const productsManager = new ProductManager();
export default productsManager;
