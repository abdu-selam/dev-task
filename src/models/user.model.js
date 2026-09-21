const { readJson, writeJson } = require("../utils/json");
const { isEmail } = require("../utils/validate");
const { v4: uuid } = require("uuid");

class UserModel {
  #allUsers = [];
  #TYPE_NAME = "users";

  async initializeUsers() {
    /* 
        instead of constructor i choose this method, and i have reason for that
            - since file operation need async constructor can't await it
            - there for the process could continue without adding the data on the #allUsers private property
    */
    const data = await readJson(this.#TYPE_NAME);

    this.#allUsers = data;
  }

  async createUser({ name, email, password }) {
    if (!name || !email || !password) {
      return {
        status: false,
        error: "Empty fields",
      };
    }

    if (!isEmail(email)) {
      return {
        status: false,
        error: "Invalid Email",
      };
    }

    const id = uuid();
    const token = uuid(); // this variable holds value that can be sent through cookies to track the user activity

    const user = {
      name,
      email,
      password,
      id,
      // i made the token array couse a user can login in mutiple browsers or devices, so that it can't be overided
      token: [token],
    };

    this.#allUsers.push(user);

    await writeJson(this.#allUsers, this.#TYPE_NAME);

    return {
      status: true,
      data: {
        name: user.name,
        email: user.email,
        token,
      },
    };
  }

  getUserById(id) {
    const user = this.#allUsers.find((user) => user.id === id);
    if (!user) {
      return null;
    }

    return user;
  }

  getUserByEmail(email) {
    const user = this.#allUsers.find((user) => user.email === email);
    if (!user) {
      return null;
    }

    return user;
  }

  getUserByToken(token) {
    const user = this.#allUsers.find((user) => user.token.includes(token));
    if (!user) {
      return null;
    }

    return user;
  }
}

const Users = new UserModel();

module.exports = Users;
