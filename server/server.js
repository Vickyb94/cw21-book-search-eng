const express = require('express');

//import apollo server
const { ApolloServer } = require ("apollo-server-express");
const path = require('path');
const db = require('./config/connection');
//import typeDef and resolvers
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  persistedQueries: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
};

// adding a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
   await server.start();
   server.applyMiddleware({ app });
}
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 API server running on localhost:${PORT}`));
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
});

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
