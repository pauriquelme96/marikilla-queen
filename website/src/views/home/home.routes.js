const express = require("express");
const { compile } = require("../../setup-templates");
const { home } = require("./home");
const homeRoutes = express();

homeRoutes.get("/", (req, res) => {
  compile({
    component: home,
    title: "Marikilla Queen",
  }).then((compiledPage) => {
    res.send(compiledPage);
  });
});

module.exports = {
  homeRoutes,
};
