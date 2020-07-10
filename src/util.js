const fs = require("fs");
const sharp = require("sharp");

function base64ToBuffer(path) {
  return Buffer.from(
    fs.readFileSync(path, {
      encoding: "utf-8",
    }),
    "base64"
  );
}

function getImages() {
  const amacianteYpe = base64ToBuffer("../assets/base64/amaciante-ype.base64");
  const heinekenZoada = base64ToBuffer(
    "../assets/base64/heineken-zoada.base64"
  );
  const skolPack = base64ToBuffer("../assets/base64/skol-pack.base64");

  return { amacianteYpe, heinekenZoada, skolPack };
}

function baseResize(buffer, path) {
  sharp(buffer)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize({
      height: 500,
      width: 500,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .toFormat("jpeg")
    .toFile(path);
}

module.exports = { getImages, baseResize };
