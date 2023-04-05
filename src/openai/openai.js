const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

module.exports = { openai };
