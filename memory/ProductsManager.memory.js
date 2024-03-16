const crypto = require("crypto");

class ProductManager {
  static #products = [];
  create(data) {
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
        console.log("Producto no creado. Ingrese todos los datos requeridos.");
      } else {
        ProductManager.#products.push(product);
        console.log("Producto Creado");
      }
    } catch (error) {
      console.log(error);
    }
  }
  read() {
    try {
      const products = ProductManager.#products;
      if (!products) {
        throw new Error("ERROR EN LA LECTURA DEL ARRAY");
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
      if (!product) {
        throw new Error("NO EXISTE EL PRODUCTO");
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
        throw new Error("NO EXISTE USUARIO CON ESE ID");
      } else {
        ProductManager.#products = filtered;
        console.log("USUARIO" + id + " ELIMINADO");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const gestorDeProductos = new ProductManager();

gestorDeProductos.create({
  photo: "foto55.jpg",
  title: "Balancin",
  category: "madera",
  price: 15000,
  stock: 41,
});

gestorDeProductos.create({
  photo: "foto7.jpg",
  title: "Bloques",
  category: "plastico",
  price: 7000,
  stock: 36,
});

gestorDeProductos.create({
  title: "Casita",
  category: "madera",
  price: 6500,
  stock: 22,
});

gestorDeProductos.create({
  photo: "luna4.jpg",
  title: "Luna",
  category: "madera",
  price: 7500,
  stock: 39,
});

gestorDeProductos.create({
  photo: "arcoiris.jpg",
  title: "Arcoiris",
  category: "madera",
  price: 7000,
  stock: 36,
});

gestorDeProductos.create({
  title: "Pajarito",
  category: "tela",
  price: 6,
  stock: 18,
});

gestorDeProductos.create({
  photo: "foto1.jpg",
  title: "Piramide",
  category: "madera",
  price: 9500,
  stock: 21,
});

gestorDeProductos.create({
  photo: "foto344.jpg",
  title: "Auto",
  category: "madera",
  price: 9900,
  stock: 12,
});

gestorDeProductos.create({
  photo: "Titere.jpg",
  title: "Titere",
  category: "tela",
  price: 4600,
  stock: 36,
});

gestorDeProductos.create({
  photo: "serpiente.jpg",
  title: "Serpiente",
  category: "tela",
  price: 7000,
  stock: 7,
});

console.log(gestorDeProductos.read());
