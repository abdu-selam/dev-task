const app = require("./src/app");
const Users = require("./src/models/user.model");
const { PORT } = require("./src/utils/env");

const start = async () => {
  await Users.initializeUsers();

  app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
};

start()
