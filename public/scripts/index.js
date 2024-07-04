(async () => {
  const query = location.search;
  const params = new URLSearchParams(query);
  const page = params.get("page");

  let online = await fetch("/api/sessions/online");
  online = await online.json();

  let template;
  if (online.statusCode === 200) {
    template = (each) => `
      <div class="card m-3" style="width: 18rem; background: #ffedbc">
        <a class="navbar-brand" href="/pages/details.html?_id=${each._id}">
          <img style="height: 12rem" src="${each.photo}" class="card-img-top" alt="${each._id}">
          <div class="card-body">
            <h5 class="card-title">${each.title} - $${each.price}</h5>
          </div>
        </a>
        <label for="quantity-${each._id}" class="form-label"><strong>Cantidad:</strong></label>
        <div class="quantity-controls mb-3">
          <button type="button" class="btn btn-warning" onclick="decreaseQuantity('${each._id}')">-</button>
          <input type="number" id="quantity-${each._id}" value="1" min="1" style="width: 50px; text-align: center;" readonly>
          <button type="button" class="btn btn-warning" onclick="increaseQuantity('${each._id}')">+</button>
        </div>
        <button type="button" class="btn btn-warning" onclick="addToCart('${each._id}')">Agregar al carrito</button>
      </div>`;
  } else {
    template = (each) => `
      <div class="card m-3" style="width: 18rem; background: #ffedbc">
        <a class="navbar-brand" href="/pages/details.html?_id=${each._id}">
          <img style="height: 12rem" src="${each.photo}" class="card-img-top" alt="${each._id}">
          <div class="card-body">
            <h5 class="card-title">${each.title} - $${each.price}</h5>
          </div>
        </a>
        <a class="btn btn-warning" href="/pages/login.html">Inicia sesión!</a>
      </div>`;
  }

  try {
    let res = await fetch(`/api/products/paginate?page=${page || 1}`);
    res = await res.json();

    const products = res.response;
    document.querySelector("#products").innerHTML = products.map((each) => template(each)).join('');

    const prev = document.querySelector("#prev");
    if (res.info.prevPage) {
      prev.innerHTML = `<a href='index.html?page=${res.info.prevPage}'> PREV </a>`;
    }

    const next = document.querySelector("#next");
    if (res.info.nextPage) {
      next.innerHTML = `<a href='index.html?page=${res.info.nextPage}'> NEXT </a>`;
    }
  } catch (err) {
    console.log(err);
  }
})();

function increaseQuantity(id) {
  const quantityInput = document.getElementById(`quantity-${id}`);
  quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity(id) {
  const quantityInput = document.getElementById(`quantity-${id}`);
  if (quantityInput.value > 1) {
    quantityInput.value = parseInt(quantityInput.value) - 1;
  }
}

async function addToCart(pid) {
  try {
    const quantity = parseInt(document.getElementById(`quantity-${pid}`).value);
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
    Swal.fire({
      title: "Genial",
      text: "Producto agregado a tu carrito.",
      icon: "success"
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
