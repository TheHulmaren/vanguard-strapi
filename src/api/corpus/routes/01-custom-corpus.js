module.exports = {
  routes: [
    {
      method: "PUT",
      path: "/corpuses/update-embedding/:id",
      handler: "01-custom-corpus.updateEmbedding",
    },
    {
      method: "DELETE",
      path: "/corpuses/delete-embedding/:id",
      handler: "01-custom-corpus.deleteEmbedding",
    },
    {
      method: "POST",
      path: "/corpuses/add-embedding",
      handler: "01-custom-corpus.addEmbedding",
    },
    {
      method: "GET",
      path: "/corpuses/query-embedding/:text",
      handler: "01-custom-corpus.queryEmbedding",
    },
    {
      method: "POST",
      path: "/corpuses/get-chat-completion",
      handler: "01-custom-corpus.getChatResponse",
    },
  ],
};
