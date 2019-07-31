const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const glue = require('schemaglue');

const { schema, resolver } = glue('app/graphql');

const apolloServer = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver
});

// Initialize the app
const app = express();
apolloServer.applyMiddleware({ app });

// Start the server
app.listen({ port: 4000 }, () => {
  console.log(`🚀 Server ready at http://localhost:4000${apolloServer.graphqlPath}`)
});

module.exports = app;
