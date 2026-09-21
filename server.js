const app = require("./src/app");
const { PORT } = require("./src/utils/env");

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
