const { readJson, writeJson } = require("../utils/json");
const Users = require("./user.model");
const { v4: uuid } = require("uuid");

class TeamModel {
  #allTeam = [];
  #TYPE_NAME = "teams";

  async initializeTeams() {
    const data = await readJson(this.#TYPE_NAME);

    this.#allTeam = data;
  }

  async createTeam({ user, name, description }) {
    if (!user || !name) {
      return {
        status: false,
        error: "All fields required",
      };
    }

    const userData = Users.getUserById(user?.id);

    if (!userData) {
      return {
        status: false,
        error: "All fields required",
      };
    }

    const id = uuid();

    const team = {
      id,
      name,
      description: typeof description === "string" ? description : "",
      members: [],
      works: [],
      admin: userData.id,
    };

    this.#allTeam.push(team);

    await writeJson(this.#allTeam, this.#TYPE_NAME);

    return {
      status: true,
      data: team,
    };
  }
}

const Team = new TeamModel();

module.exports = Team;
