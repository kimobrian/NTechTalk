const express = require("express");
const {ApolloServer} = require("apollo-server-express");
const {importSchema} = require("graphql-import");
const typeDefs = importSchema("schema.graphql");
const {makeExecutableSchema} = require("graphql-tools");
const {getUser, getAllUsers, createUser} = require("./controller");

// Resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (parent, args) => getUser(args.id),
    users: () => getAllUsers()
  },
  Mutation: {
    createUser: (parent, {params}) => {
      const {name, age, citizenship, gender, married} = params;
      return createUser(name, age, citizenship, gender, married);
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

const server = new ApolloServer({schema, playground: true, tracing: true});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/rest", (req, res) => {
  res.json({message: "Welcome to our GraphQL + REST API"});
});

app.get("/rest/users", (req, res) => {
  res.json(getAllUsers());
});

app.get("/rest/user/:id", (req, res) => {
  const recordId = req.params.id;
  res.json(getUser(recordId));
});

app.post("/rest/user", (req, res) => {
  const {name, age, citizenship, gender, married} = req.body;
  res.json(createUser(name, age, citizenship, gender, married));
});

server.applyMiddleware({app});

app.listen({port: 4000}, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
