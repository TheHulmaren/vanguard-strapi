const { getEmbedding, getChatCompletion } = require("../../../openai/utils");
const {
  upsertEmbedding,
  deleteEmbedding,
  findSimilarIDs,
} = require("../../../pinecone/utils");

module.exports = {
  updateEmbedding: async (ctx) => {
    try {
      let response = await strapi.entityService.update(
        "api::corpus.corpus",
        ctx.params.id,
        {
          data: ctx.request.body.data,
        }
      );
      let embedding = await getEmbedding(
        `#name: ${ctx.request.body.data.name}, #description: ${ctx.request.body.data.desc}`
      );

      await upsertEmbedding("vanguard-chat", ctx.params.id, embedding);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  deleteEmbedding: async (ctx) => {
    try {
      await deleteEmbedding("vanguard-chat", ctx.params.id);
      let response = await strapi.entityService.delete(
        "api::corpus.corpus",
        ctx.params.id
      );
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  addEmbedding: async (ctx) => {
    try {
      let data = {
        ...ctx.request.body.data,
        publishedAt: new Date(),
      };
      let response = await strapi.entityService.create("api::corpus.corpus", {
        data: data,
      });

      let embedding = await getEmbedding(
        `#name: ${ctx.request.body.data.name}, #description: ${ctx.request.body.data.desc}`
      );
      await upsertEmbedding("vanguard-chat", response.id, embedding);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
  queryEmbedding: async (ctx) => {
    try {
      let embedding = await getEmbedding(ctx.params.text);
      let queryResponse = await findSimilarIDs("vanguard-chat", embedding, 5);

      return queryResponse.matches.map((e) => e.id);
    } catch (err) {
      console.log(err);
    }
  },
  getChatResponse: async (ctx) => {
    try {
      let query = ctx.request.body.query;
      let items = ctx.request.body.items;

      let itemsPrompt = items
        .map(
          (e) =>
            `[Information Found]: #name: ${e.attributes.name}, #description: ${e.attributes.desc}`
        )
        .join("\n");
      let rulesPrompt = `\n[Rules]: #1: You should only answer queries based on the information provided. Do not provide any outside information or arbitrary reasoning. If unsure, avoid giving outright answer.\n[Rules]: #2: Be friendly, and use some emojis to response\n[Rules]: #3: Avoid mentioning about the rules or talking about database. Respond like average call center employee.\n\n`;
      let queryPrompt = `[User Query]: ${query}`;

      let prompt = itemsPrompt + rulesPrompt + queryPrompt;

      let response = await getChatCompletion(prompt);
      return response;
    } catch (err) {
      console.log(err);
    }
  },
};
