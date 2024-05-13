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

fetch("/api/products/paginate")
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    const products = res.response
    // no me está encontrando el response.docs... es como un error en la paginación
    document.querySelector("#products").innerHTML = products.map(each=>template(each))

  })
  .catch((err) => console.log(err));


  async function addToCart (pid) {
    try {
      const each = {
        user_id: "662d7c0a0232c7d0cc1a95b6",
        product_id: pid,
        quantity: 1
      }
      const url = "/api/carts"
      const opts = {
        method: "POST",
        body: JSON.stringify(each),
        headers: {"Content-Type": "application/json"}
      }

      let response = await fetch (url, opts)
      response =await response.json()
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }