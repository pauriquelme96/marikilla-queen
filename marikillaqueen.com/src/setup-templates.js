const { kTemplate } = require("../air_modules/kTemplate/index");

const { home } = require("./views/home/home");

// -----------------------------------
// SETUP
// -----------------------------------

// Setup kTemplate
const compile = kTemplate({
  components: {
    home,
  },
  conf: {
    lang: "es",
    head: [
      '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>',
      '<meta name="description" content="Sitio web de Marikilla Queen">',
      //TODO: CHANGE THEME COLOR '<meta name="theme-color" content="#232323" />',
      '<script src="https://kit.fontawesome.com/19966f4f43.js" crossorigin="anonymous"></script>',
      '<link rel="stylesheet" async defer href="/assets/style.css">',
      '<link rel="stylesheet" async defer href="/assets/reset.css">',
      '<link rel="stylesheet" async defer href="/assets/theme.css">',
    ],
    favicon: "/assets/favicon.ico",
    assetsFolder: "/assets",
  },
});

module.exports = {
  compile,
};
