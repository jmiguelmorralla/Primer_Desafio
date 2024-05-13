const template = (each) => `
<div class="card m-3" style="width: 18rem; background: #ffedbc">
     <div class="card-body">
        <h5 class="card-title">${each.product_id.title}</h5>
        <p class="card-title">${each.product_id.price}</p>
    </div>
    </a>
    <button type="button" class="btn btn-warning" onclick="destroy('${each._id}')">Delete</button>
    </div>`;

fetch("/api/carts?user_id=662d7c0a0232c7d0cc1a95b6")
  .then((res) => res.json())
  .then((res) => {
    const products = res.response;
    document.querySelector("#productsOnCart").innerHTML = products
      .map((each) => template(each))
      .join("");
      console.log(res.response)
  })
  .catch((err) => console.log(err));

async function destroy(cid) {
  try {
    const url = "/api/carts/"+cid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    location.reload()
  } catch (error) {
    console.log(error);
  }
}
