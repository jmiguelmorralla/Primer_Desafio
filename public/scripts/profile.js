// fetch("/api/sessions")
//   .then((res) => res.json())
//   .then((res) => {
//     const user = res.response;
//     document.querySelector("#profile").innerHTML = user
//     console.log(res);
//   })
//   .catch((err) => console.log(err));

fetch("/api/sessions")
  .then((res) => {
    if (!res.ok) { // Verifica si la respuesta es exitosa
      throw new Error(`Error HTTP: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    const profile = document.querySelector("#profile");
    if (profile) {
      const userEmail = data.user_email || "No disponible";
      const userId = data.user_id || "No disponible";
      const userPhoto = data.user_photo || "";

      const user = `
      <div class="card m-3" style="width: 18rem; background: #ffedbc">
      ${userPhoto ? `<img src="${userPhoto}" class="card-img-top" alt="Foto de usuario">` : ''}
      <div class="card-body">
        <h5 class="card-title">Perfil de Usuario</h5>
        <p class="card-text"><strong>Email:</strong> ${userEmail}</p>
        <p class="card-text"><strong>ID de Usuario:</strong> ${userId}</p>
      </div>
    </div>
      `;
      profile.innerHTML = user;
    }
  })
  .catch((err) => {
    console.error("Error:", err);
  });
