const query = location.search;
const params = new URLSearchParams(query);
const page = params.get("page");

const template = (each) => `
<div class="card m-3" style="width: 18rem; background: #ffedbc">
  <a class="navbar-brand" href="/pages/details.html?_id=${each._id}">
    <img style="height: 12rem" src="${each.photo}" class="card-img-top" alt="${each._id}">
    <div class="card-body">
        <h5 class="card-title">${each.title}</h5>
    </div>
    </a>
    <button type="button" class="btn btn-warning" onclick="addToCart('${each._id}')">Add to cart</button>
    </div>`;

fetch(`/api/products/paginate?page=${page || 1}`)
  .then((res) => res.json())
  .then((res) => {
    const products = res.response;
    document.querySelector("#products").innerHTML = products.map((each) =>
      template(each)
    );

    console.log(page);
    const prev = document.querySelector("#prev");
    res.info.prevPage &&
      (prev.innerHTML = `<a href='products.html?page=${res.info.prevPage}'> PREV </a>`);
    const next = document.querySelector("#next");
    res.info.nextPage &&
      (next.innerHTML = `<a href='products.html?page=${res.info.nextPage}'> NEXT </a>`);
  })
  .catch((err) => console.log(err));

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
