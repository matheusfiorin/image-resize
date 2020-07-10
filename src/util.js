const fs = require("fs");
const sharp = require("sharp");
const BASE_PATH = "./assets/base64/";

function base64ToBuffer(base64) {
  return Buffer.from(base64, "base64");
}

function pathToBuffer(path) {
  return Buffer.from(
    fs.readFileSync(path, {
      encoding: "utf-8",
    }),
    "base64"
  );
}

function getImages() {
  const amacianteYpe = pathToBuffer(`${BASE_PATH}/amaciante-ype.base64`);
  const heinekenZoada = pathToBuffer(`${BASE_PATH}/heineken-zoada.base64`);
  const skolPack = pathToBuffer(`${BASE_PATH}/skol-pack.base64`);

  return [
    { buffer: amacianteYpe, path: "src/output/amaciante.jpg" },
    { buffer: heinekenZoada, path: "src/output/heineken.jpg" },
    { buffer: skolPack, path: "src/output/skol.jpg" },
  ];
}

async function baseResize(buffer, path) {
  const resizedBuffer = await sharp(buffer)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .resize({
      height: 500,
      width: 500,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .toFormat("jpeg")
    .toBuffer();

  if (!!path) {
    bufferToFile(resizedBuffer, path);
    return;
  }

  return resizedBuffer;
}

function bufferToFile(buffer, path) {
  sharp(buffer).toFile(path);
}

module.exports = { getImages, baseResize, base64ToBuffer };
