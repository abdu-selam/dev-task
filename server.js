const app = require("./src/app");
const Team = require("./src/models/team.model");
const Users = require("./src/models/user.model");
const { PORT } = require("./src/utils/env");

const start = async () => {
  await Users.initializeUsers();
  await Team.initializeTeams()

  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
};

start()
