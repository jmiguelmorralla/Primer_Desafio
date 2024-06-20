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
</div>`;



// Función para calcular el total
function calculateTotal(products) {
  return products.reduce((total, each) => total + (each.product_id.price * each.quantity), 0);
}

// Función para vaciar el carrito
async function emptyCart() {
  try {
    const url = "/api/carts";
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


fetch("/api/carts")
  .then((res) => res.json())
  .then((res) => {
    const products = res.response;
    console.log(products);
  
    if (products) {
      // Renderizar los productos en el carrito
      document.querySelector("#productsOnCart").innerHTML = products
        .map((each) => template(each))
        .join("");

      // Calcular el total y mostrarlo
      const total = calculateTotal(products);
      document.querySelector("#total").innerText = `Total: $${total.toFixed(2)}`;
      document.querySelector("#emptyCartBtn").innerHTML = `<a class="btn btn-warning m-3" onclick="emptyCart()">Vaciar Carrito</a>`;

    }
    else { 
      document.querySelector("#productsOnCart").innerHTML = empty;
    }
  })
  .catch((err) => console.log(err));
