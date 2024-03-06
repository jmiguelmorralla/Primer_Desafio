class ProductManager {
    static #products = []
    create(data){
        const product = {
            id: ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id+1,
            photo: data.photo,
            title: data.title,
            category: data.category,
            price: data.price,
            stock: data.stock
        };
    ProductManager.#products.push(product);
    console.log("Producto Creado");
    }
read(){
    return ProductManager.#products
}
}

const gestorDeProductos = new ProductManager()

gestorDeProductos.create({
    photo: "foto55.jpg",
    title: "Balancin",
    category: "madera",
    price: 15000,
    stock: 25
})

gestorDeProductos.create({
    photo: "foto7.jpg",
    title: "Rompecabezas",
    category: "plastico",
    price: 7000,
    stock: 36
})

gestorDeProductos.create({
    photo: "foto55.jpg",
    title: "Rompecabezas",
    category: "plastico",
    price: 7000,
    stock: 36
})

gestorDeProductos.create({
    photo: "foto55.jpg",
    title: "Rompecabezas",
    category: "plastico",
    price: 7000,
    stock: 36
})

gestorDeProductos.create({
    photo: "foto55.jpg",
    title: "Rompecabezas",
    category: "plastico",
    price: 7000,
    stock: 36
})

console.log(gestorDeProductos.read())