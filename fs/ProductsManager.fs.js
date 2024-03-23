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
      console.log("Created file.");
    } else {
      console.log("File already exists.");
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
        console.log("Not created file. Please complete required data.");
      } else {
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        console.log("Created Product.");
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
      console.log(product)
      if (!product) {
        throw new Error("Product does not exist.");
      } else {
        console.log(product)
      return product};

    } catch (error) {
      console.log(error);
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      let product = products.find((each) => each.id === id)
      if (!product) {
        throw new Error("Product does not exist.");
      } else {
        let filtered = products.filter((each) => each.id !== id);
        filtered = JSON.stringify(filtered, null, 2)
        await fs.promises.writeFile(this.path, filtered);
        console.log("Deleted " + id + " product.");
      }
    } catch (error) {
      console.log(error);
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

  console.log(await productManager.read());
}

async function testRead() {
  const productManager = new ProductManager();
  await productManager.read()
  console.log(await productManager.read())
}

async function testReadOne() {
  const productManager = new ProductManager();
  await productManager.readOne("844f540d20ff624655dbacff")
  console.log(await productManager.readOne())
}

async function testDestroy() {
  const productManager = new ProductManager();
  await productManager.destroy("83ebb90f2899376590bb33fa")
  console.log(await productManager.readOne())
}

// testCreate()
// testRead()
// testReadOne()
testDestroy()