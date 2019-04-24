const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const {importSchema} = require("graphql-import");
const typeDefs = importSchema("schema.graphql");
const {makeExecutableSchema} = require("graphql-tools");

// Resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!" // Resolver function for hello operation
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({schema, playground: true});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/rest", (req, res) => {
  res.json({message: "Welcome to our GraphQL + REST API"});
});

server.applyMiddleware({app});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
