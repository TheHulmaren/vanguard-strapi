const { PineconeClient } = require("@pinecone-database/pinecone");

const pinecone = new PineconeClient();

const initPinecone = async () => {
  await pinecone.init({
    environment: "us-east4-gcp",
    apiKey: "7699ebab-9226-494f-9b6a-74c7b4234080",
  });
};

module.exports = { initPinecone, pinecone };
