const express = require("express");
const { homeRoutes } = require("./views/home/home.routes");

// -----------------------------------
// SETUP
// -----------------------------------
const app = express();

// Setup static assets folder
app.use("/assets", express.static("./assets"));

// Setup routes
app.use(homeRoutes);

// Run server
app.listen(3000, () => {
  console.log("SERVER LISTENING IN PORT 3000");
});
