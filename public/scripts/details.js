(async () => {
  const queries = location.search;
  const params = new URLSearchParams(queries);
  const pid = params.get("_id");

  let online = await fetch("/api/sessions/online");
  online = await online.json();

  try {
    let res = await fetch("/api/products/" + pid);
    let product = await res.json();
    renderProductCard(product, online);
  } catch (err) {
    console.log(err);
  }

  function renderProductCard(product, online) {
    const productCardContainer = document.getElementById("details");

    let productCardHTML;
    if (online.statusCode === 200) {
      productCardHTML = `
        <div class="col-md-4">
          <div class="card">
            <img src="${product.response.photo}" class="card-img-top" alt="${product.response.title}">
            <div class="card-body">
              <h5 class="card-title">${product.response.title}</h5>
              <p class="card-text">${product.response.category}</p>
              <p class="card-text"><strong>Price: </strong>$${product.response.price}</p>
              <label for="quantity" class="form-label"><strong>Cantidad:</strong></label>
              <div class="quantity-controls mb-3">
                <button type="button" class="btn btn-warning" id="decrease-quantity">-</button>
                <input type="number" id="quantity" value="1" min="1" style="width: 50px; text-align: center;" readonly>
                <button type="button" class="btn btn-warning" id="increase-quantity">+</button>
              </div>
              <button type="button" class="btn btn-warning" id="add-to-cart-button">Agregar al carrito</button>
            </div>
          </div>
        </div>
      `;
    } else {
      productCardHTML = `
        <div class="col-md-4">
          <div class="card">
            <img src="${product.response.photo}" class="card-img-top" alt="${product.response.title}">
            <div class="card-body">
              <h5 class="card-title">${product.response.title}</h5>
              <p class="card-text">${product.response.category}</p>
              <p class="card-text"><strong>Price: </strong>$${product.response.price}</p>
              <a class="btn btn-warning" href="/pages/login.html">Inicia sesión!</a>
            </div>
          </div>
        </div>
      `;
    }

    productCardContainer.innerHTML = productCardHTML;

    if (online.statusCode === 200) {
      document.getElementById('add-to-cart-button').onclick = () => addToCart(product.response._id);
      document.getElementById('increase-quantity').onclick = increaseQuantity;
      document.getElementById('decrease-quantity').onclick = decreaseQuantity;
    }
  }

  function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
  }

  function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  }
})();

async function addToCart(pid) {
  try {
    const quantity = parseInt(document.getElementById('quantity').value);
    const each = {
      product_id: pid,
      quantity: quantity,
    };
    const url = "/api/carts";
    const opts = {
      method: "POST",
      body: JSON.stringify(each),
      headers: { "Content-Type": "application/json" },
    };

    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
