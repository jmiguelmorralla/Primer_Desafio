class CartManager {
  static #carts = [];
  create(data) {
    try {
      const cart = {
        id: data.id,
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        state: data.state,
        };

        CartManager.#carts.push(cart);
        console.log("Cart created succesfully.");
        return cart;

    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      const carts = CartManager.#carts;
      if (!carts) {
        throw new Error("Fail at reading array");
      } else {
        return carts;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const cart = CartManager.#carts.find((each) => each.id === id);
      if (!cart) {
        throw new Error("Cart not found.");
      } else {
        return cart;
      }
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      let cart = CartManager.#carts.find((each) => each.id === id);
      console.log(cart);
      if (cart) {
        for (let prop in data) {
          cart[prop] = data[prop];
        }
        return cart;
      } else {
        const error = new Error("Not cart found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const filtered = CartManager.#carts.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("No ID carts found.");
      } else {
        CartManager.#carts = filtered;
        console.log("Deleted " + id + " cart.");
      }
    } catch (error) {
      throw error;
    }
  }
}

const cartsManager = new CartManager();

cartsManager.create({
  id: 15163513,
  user_id: 35435435,
  product_id: 454315,
  quantity: 20,
  state: "reserved",
});

cartsManager.create({
  id: "156asfwaf7",
  user_id: "fasf486463",
  product_id: "jh4634",
  quantity: 15,
  state: "paid",
});


// console.log(cartsManager.read());
// console.log(cartsManager.readOne(15163513));
// console.log(cartsManager.update(15163513, {state:"delivered"}));
console.log(cartsManager.destroy(15163513));