const { ApolloServer, gql } = require("apollo-server-express");
const { createWriteStream, existsSync, mkdirSync } = require("fs");
const path = require("path");
const express = require("express");
const {Storage} = require('@google-cloud/storage');
const { Console } = require("console");

const files = [];

const typeDefs = gql`
  type Query {
    files: [String]
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean
  }
`;

  const gc = new Storage({
    keyFileName: path.join(__dirname,"../stone-semiotics-297911-01ec4ae38b3a.json"),
    projectID: 'stone-semiotics-297911'
  });
  const storage = new Storage();
// Makes an authenticated API request.
async function listBuckets() {
  try {
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}
listBuckets();

const nodejsBucket = gc.bucket('stone-semiotics-297911-images-input');

const resolvers = {
  Query: {
    files: () => files
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { createReadStream, filename } = await file;

      await new Promise(res =>
        createReadStream()
          .pipe(
            nodejsBucket.file(filename).createWriteStream({
              resumable: false,
              gzip: false
            })
          )
          .on("finish", res)
      );

      files.push(filename);

      return true;
    }
  }
};

existsSync(path.join(__dirname, "../images")) || mkdirSync(path.join(__dirname, "../images"));

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use("/images", express.static(path.join(__dirname, "../images")));
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log(`🚀  Server ready at http://localhost:4000/`);
});
