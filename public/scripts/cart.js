const template = (each) => `
<div class="row mb-3">
  <div class="col-12">
    <div class="table-responsive">
      <table class="table table-striped">
        <tbody>
          <tr>
            <td class="col-3"><img src="${each.product_id.photo}" class="img-fluid" style="max-width: 100px; height: auto;" alt="Foto del producto"></td>
            <td class="col-6">${each.product_id.title}</td>
            <td class="col-1">${each.product_id.price}</td>
            <td class="col-1">${each.quantity}</td>
            <td class="col-1"><button type="button" class="btn btn-warning btn-sm" onclick="destroy('${each._id}')">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

`;

const empty = `
<div>
<h2>Agrega productos a tu carrito.</h2>
<a class="btn btn-warning m-3" href="/pages/products.html">Ir a productos</a>
</div>`
fetch("/api/carts")
  .then((res) => res.json())
  .then((res) => {
    const products = res.response;
    if (products) {
      document.querySelector("#productsOnCart").innerHTML = products
        .map((each) => template(each))
        .join("");
      }
      else { 
        document.querySelector("#productsOnCart").innerHTML = empty
      }

  })
  .catch((err) => console.log(err));

async function destroy(cid) {
  try {
    const url = "/api/carts/" + cid;
    const opts = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    let response = await fetch(url, opts);
    response = await response.json();
    console.log(response);
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
