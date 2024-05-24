async function printIcons() {
  let template = "";
  let online = await fetch("/api/sessions");
  online = await online.json();
  if (online.statusCode === 200) {
    template = `
      <div class="navbar-nav" id="buttonsOnLine">
      <a class="nav-link" href="/pages/products.html">Products</a>
      <a class="nav-link" href="/pages/carts.html">Cart</a>
      <a class="nav-link" href="/pages/profile.html">Profile</a>
      <button class="btn btn-danger" id="signout">Logout</button>
        </div>`;
    document.querySelector("#navbar").innerHTML = template;
    document.querySelector("#signout").onclick = async () => {
      const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      };
      let response = await fetch("/api/sessions/signout", opts);
      response = await response.json();
      if (response.statusCode === 200) {
        location.replace("/");
      }
    };
  } else {
    template = `   
      <div class="navbar-nav" id="buttonsOffLine">
      <a class="nav-link" href="/pages/products.html">Products</a>
      <a class="nav-link" href="/pages/register.html">Register</a>
      <a class="nav-link" href="/pages/login.html">Login</a>
      </div>`;

    document.querySelector("#navbar").innerHTML = template;
  }
}

printIcons();
