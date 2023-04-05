const { PineconeClient } = require("@pinecone-database/pinecone");

const pinecone = new PineconeClient();

const initPinecone = async () => {
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT,
    apiKey: process.env.PINECONE_API_KEY,
  });
};

module.exports = { initPinecone, pinecone };
