const crypto = require("crypto");

class ProductManager {
  static #products = [];
  create(data) {
    try {
      const product = {
        id: data.id || crypto.randomBytes(12).toString("hex"),
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
        ProductManager.#products.push(product);
        console.log("Created Product.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const products = ProductManager.#products;
      if (!products) {
        throw new Error("Error at reading array.");
      } else {
        return products;
      }
    } catch (error) {
      console.log(error);
    }
  }

  readOne(id) {
    try {
      const product = ProductManager.#products.find((each) => each.id === id);
      console.log(product)
      if (!product) {
        throw new Error("Product does not exist.");
      } else {
        return product;
      }
    } catch (error) {
      console.log(error);
    }
  }

  destroy(id) {
    try {
      const filtered = ProductManager.#products.filter(
        (each) => each.id !== id
      );
      if (!id) {
        throw new Error("Product does not exist.");
      } else {
        ProductManager.#products = filtered;
        console.log("Deleted " + id + " product.");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const productManager = new ProductManager();

productManager.create({
  photo: "foto55.jpg",
  title: "Balancin",
  category: "madera",
  price: 15000,
  stock: 41,
});

productManager.create({
  photo: "foto7.jpg",
  title: "Bloques",
  category: "plastico",
  price: 7000,
  stock: 36,
});

productManager.create({
  title: "Casita",
  category: "madera",
  price: 6500,
  stock: 22,
});

productManager.create({
  photo: "luna4.jpg",
  title: "Luna",
  category: "madera",
  price: 7500,
  stock: 39,
});

productManager.create({
  photo: "arcoiris.jpg",
  title: "Arcoiris",
  category: "madera",
  price: 7000,
  stock: 36,
});

productManager.create({
  title: "Pajarito",
  category: "tela",
  price: 6,
  stock: 18,
});

productManager.create({
  photo: "foto1.jpg",
  title: "Piramide",
  category: "madera",
  price: 9500,
  stock: 21,
});

productManager.create({
  photo: "foto344.jpg",
  title: "Auto",
  category: "madera",
  price: 9900,
  stock: 12,
});

productManager.create({
  photo: "Titere.jpg",
  title: "Titere",
  category: "tela",
  price: 4600,
  stock: 36,
});

productManager.create({
  id: "111",
  photo: "serpiente.jpg",
  title: "Serpiente",
  category: "tela",
  price: 7000,
  stock: 7,
});

console.log(productManager.destroy("111"));
