const fs = require("fs");
const sharp = require("sharp");
const BASE_PATH = "../assets/base64/";

function base64ToBuffer(path) {
  return Buffer.from(
    fs.readFileSync(path, {
      encoding: "utf-8",
    }),
    "base64"
  );
}

function getImages() {
  const amacianteYpe = base64ToBuffer(`${BASE_PATH}/amaciante-ype.base64`);
  const heinekenZoada = base64ToBuffer(`${BASE_PATH}/heineken-zoada.base64`);
  const skolPack = base64ToBuffer(`${BASE_PATH}/skol-pack.base64`);

  return [
    { buffer: amacianteYpe, path: "output/amaciante.jpg" },
    { buffer: heinekenZoada, path: "output/heineken.jpg" },
    { buffer: skolPack, path: "output/skol.jpg" },
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

module.exports = { getImages, baseResize };
