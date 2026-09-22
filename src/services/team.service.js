const { isEmail } = require("../utils/validate");
const { v4: uuid } = require("uuid");

const formatMembersArray = (members) => {
  const filtered = members.filter(
    (user) => typeof user.name === "string" && user.name,
  );

  const result = filtered.map((user) => ({
    name: user.name,
    email: isEmail(user.email) ? user.email : "",
    label: user.label || "",
    roll: user.roll || "",
    id: uuid(),
  }));

  return result;
};

module.exports = {
  formatMembersArray,
};
