const crypto = require("crypto");

class UserManager {
  static #users = [];
  create(data) {
    try {
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo:
          data.photo ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRueick0BA5tVSQJFjPJ49GPHAl30OzLnSjvRT_rpGv784YF5bCSHJ7V_qFVQ3aDkM2qlQ&usqp=CAU",
        email: data.email,
        password: data.password,
        role: data.role || "0",
      };

      if (!data.email || !data.password) {
        throw new Error(
          "Not created user. Please complete EMAIL and PASSWORD."
        );
      } else {
        UserManager.#users.push(user);
        console.log("User created succesfully.");
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
  read() {
    try {
      const users = UserManager.#users;
      if (!users) {
        throw new Error("Fail at reading array");
      } else {
        return users;
      }
    } catch (error) {
      throw error;
    }
  }

  readOne(id) {
    try {
      const user = UserManager.#users.find((each) => each.id === id);
      if (!user) {
        throw new Error("User not found.");
      } else {
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      let user = UserManager.#users.find((each) => each.id === id);
      console.log(user);
      if (user) {
        for (let prop in data) {
          user[prop] = data[prop];
        }
        return user;
      } else {
        const error = new Error("Not user found.");
        error.statusCode = 404;
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  destroy(id) {
    try {
      const filtered = UserManager.#users.filter((each) => each.id !== id);
      if (!id) {
        throw new Error("No ID users found.");
      } else {
        UserManager.#users = filtered;
        console.log("Deleted " + id + " user.");
      }
    } catch (error) {
      throw error;
    }
  }
}

const usersManager = new UserManager();

usersManager.create({
  photo: "foto.jpg",
  email: "juan@gmail.com",
  password: "holapepito@",
  role: "1",
});

usersManager.create({
  email: "cecilia@gmail.com",
  password: "Cecilia123",
  role: "0",
});

usersManager.create({
  photo: "foto7.jpg",
  email: "carlos_m@gmail.com",
  password: "charly123",
  role: "0",
});

usersManager.create({
  photo: "fotofrente.jpg",
  email: "donvictor@gmail.com",
  password: "vicky_@2",
  role: "0",
});

console.log(usersManager.read());
