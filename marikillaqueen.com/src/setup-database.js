const { kDatabase } = require("../air_modules/kDatabase/index");

// Setup Database
const db = kDatabase(__dirname + "/..", "marikilla");

module.exports = {
  db,
};
