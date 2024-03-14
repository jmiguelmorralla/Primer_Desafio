class ProductManager {
  static #products = [];
  create(data) {
    const product = {
      id:
        ProductManager.#products.length === 0
          ? 1
          : ProductManager.#products[ProductManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };

    !data.stock || !data.title || !data.photo || !data.category || !data.price
      ? console.log("Producto no creado. Ingrese todos los datos.")
      : ProductManager.#products.push(product);
    console.log("Producto Creado");
  }
  read() {
    return ProductManager.#products;
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
  photo: "foto3.jpg",
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
  photo: "foto12.jpg",
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

//agregar readOne(id) y destroy(id)