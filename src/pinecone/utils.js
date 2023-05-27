const { pinecone } = require("./pinecone");

const upsertEmbedding = async (index, id, embedding) => {
  const indexObject = pinecone.Index(index);
  const upsertRequest = {
    vectors: [
      {
        id: String(id),
        values: embedding,
      },
    ],
    namespace: "example-namespace",
  };
  const upsertResponse = await indexObject.upsert({ upsertRequest:upsertRequest });

  console.log(upsertRequest);
  return upsertResponse;
};

const deleteEmbedding = async (index, id) => {
  const indexObject = pinecone.Index(index);
  const deleteRequest = {
    ids: [String(id)],
    namespace: "example-namespace",
  };
  const deleteResponse = await indexObject.delete1( deleteRequest );

  return deleteResponse;
};

const findSimilarIDs = async (index, embedding, k) => {
  const indexObject = pinecone.Index(index);
  const queryResponse = await indexObject.query({
    queryRequest: {
      namespace: "example-namespace",
      topK: k,
      vector: embedding,
    },
  });

  return queryResponse;
}

module.exports = { upsertEmbedding, deleteEmbedding, findSimilarIDs };
