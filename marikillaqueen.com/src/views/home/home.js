const { file } = require("../../utils/utils");

const home = {
  tag: "home",
  template: file(__dirname + "/home.html"),
  style: file(__dirname + "/home.css"),
  compile() {
    return Promise.resolve({});
  },
};

module.exports = {
  home,
};
