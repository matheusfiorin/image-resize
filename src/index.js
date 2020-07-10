const { getImages, baseResize } = require("./util.js");

function simpleResize() {
  const images = getImages();
  baseResize(images.amacianteYpe, "output/amaciante.jpg");
  baseResize(images.heinekenZoada, "output/heineken.jpg");
  baseResize(images.skolPack, "output/skol.jpg");
}

simpleResize();
