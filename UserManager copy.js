class UserManager {
    static #users = []
    create(data){
        const user = {
            id: UserManager.#users.length === 0 ? 1 : UserManager.#users[UserManager.#users.length - 1].id+1,
            foto: data.foto,
            email: data.email,
            password: data.password,
            role: 0
        };
    UserManager.#users.push(user);
    console.log("Usuario Creado");
    }
read(){
    return UserManager.#users
}
}

const gestorDeUsuarios = new UserManager()
gestorDeUsuarios.create({
    foto: "foto.jpg",
    email: "juan@gmail.com",
    password: "holapepito@",
})

gestorDeUsuarios.create({
    foto: "fotoperfil.jpg",
    email: "cecilia@gmail.com",
    password: "Cecilia123",
})



console.log(gestorDeUsuarios.read())