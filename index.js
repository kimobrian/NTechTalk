const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ typeDefs, resolvers, playground:true });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/rest", (req, res)=> {
  res.json({"message": "Welcome to our GraphQL + REST API"});
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
