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
    if (!user || !name?.trim()) {
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
      name: name.trim(),
      description: typeof description === "string" ? description : "",
      members: [],
      works: [],
      admin: userData.id,
    };

    this.#allTeam.push(team);

    await writeJson(this.#allTeam, this.#TYPE_NAME);

    return {
      status: true,
      data: structuredClone(team),
    };
  }

  async updateTeam(teamId, name, description) {
    const team = this.#allTeam.find((team) => team.id === teamId);

    if (!team) {
      return null;
    }

    team.name = typeof name === "string" && name.trim() ? name : this.name;
    team.description =
      typeof description === "string" && description.trim()
        ? description
        : this.description;

    await writeJson(this.#allTeam, this.#TYPE_NAME);

    return {
      name: team.name,
      description: team.description,
    };
  }

  getTeamById(teamId) {
    const team = this.#allTeam.find((team) => team.id === teamId);

    if (!team) {
      return null;
    }

    return structuredClone(team);
  }

  getTeamsByAdmin(adminId) {
    const teams = this.#allTeam.filter((team) => team.admin === adminId);

    return teams;
  }

  async deleteTeam(teamId) {
    this.#allTeam = this.#allTeam.filter((team) => team.id !== teamId);

    await writeJson(this.#allTeam, this.#TYPE_NAME);
  }

  async addMembers(members, teamId) {
    const team = this.#allTeam.find((team) => team.id === teamId);

    if (!team) {
      return null;
    }

    team.members.push(...members);
    await writeJson(this.#allTeam, this.#TYPE_NAME);
    return true;
  }

  async removeMembers(memberIds, teamId) {
    const team = this.#allTeam.find((team) => team.id === teamId);

    team.members = team.members.filter(
      (member) => !memberIds.includes(member.id),
    );

    await writeJson(this.#allTeam, this.#TYPE_NAME);
  }

  async updateMember(teamId, userId, { name, email, roll, label }) {
    const team = this.#allTeam.find((team) => team.id === teamId);

    team.members = team.members.map((member) => {
      if (member.id === userId) {
        member.name = this.#checkProps(name) ? name : member.name;
        member.email = this.#checkProps(email) ? email : member.email;
        member.roll = this.#checkProps(roll) ? roll : member.roll;
        member.label = this.#checkProps(label) ? label : member.label;
      }

      return member;
    });

    await writeJson(this.#allTeam, this.#TYPE_NAME);
  }

  #checkProps(value) {
    return typeof value === "string" && value.trim();
  }

  async addWork(teamId, title, description) {
    const team = this.#allTeam.find((team) => team.id === teamId);

    if (!team) {
      return;
    }

    team.works.push({
      title,
      description,
      tasks: [],
      user: null,
      id: uuid(),
    });

    await writeJson(this.#allTeam, this.#TYPE_NAME);

    return team.works;
  }
}

const Team = new TeamModel();

module.exports = Team;
