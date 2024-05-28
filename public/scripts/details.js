const queries = location.search;

const params = new URLSearchParams(queries);

const pid = params.get("_id");

fetch("/api/products/" + pid)
  .then((res) => res.json())
  .then((product) => {
    renderProductCard(product);
  })
  .catch((err) => console.log(err));

function renderProductCard(product) {
  const productCardContainer = document.getElementById("details");
  console.log(product)

  const productCardHTML = `
    <div class="col-md-4">
      <div class="card">
        <img src="${product.response.photo}" class="card-img-top" alt="${product.response.title}">
        <class="card-body">
          <h5 class="card-title">${product.response.title}</h5>
          <p class="card-text">${product.response.category}</p>
          <p class="card-text"><strong>Price: </strong>$${product.response.price}</p>
          <button type="button" class="btn btn-warning" onclick="addToCart('${product.response._id}')">Add to cart</button>
        </div>
      </div>
    </div>
  `;

  productCardContainer.innerHTML = productCardHTML;
}

async function addToCart(pid) {
  try {
    const each = {
      product_id: pid,
      quantity: 1,
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
