require("dotenv").config();
const fastify = require("fastify")();
const { base64ToBuffer, baseResize } = require("./util.js");
const APP_PORT = process.env.APP_PORT || 3000;

const bodyJsonSchema = {
  type: "object",
  required: ["base64"],
  properties: {
    base64: { type: "string" },
  },
};

const schema = {
  body: bodyJsonSchema,
};

fastify.post("/", { schema }, async (request, reply) => {
  const rawBuffer = base64ToBuffer(request.body.base64);
  const resizedBuffer = await baseResize(rawBuffer, null);
  reply.code(201).send({
    resizedImage: {
      url: "",
      size: `${(resizedBuffer.byteLength / 1000).toFixed(2)}KB`,
      base64: resizedBuffer.toString("base64"),
    },
  });
});

fastify.listen(APP_PORT, (err) => {
  console.info(`Server listening on port ${fastify.server.address().port}`);
});
