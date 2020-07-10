const { getImages, baseResize } = require("./util.js");
const images = getImages();

function bulkResizeToFile() {
  images.forEach((elem) => {
    baseResize(elem.buffer, elem.path);
  });
}

async function singleResizeToBuffer() {
  const resizedBuffer = await baseResize(images[1].buffer, null);
  
  const resizedBufferSize = `${(resizedBuffer.byteLength / 1000).toFixed(2)}KB`;
  console.info({ resizedBufferSize });
}

bulkResizeToFile();
singleResizeToBuffer();
