const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
require('dotenv').config(); // Load environment variables from .env file

// Logging the SECRET to ensure it's being loaded from the .env file
console.log('SECRET:', process.env.SECRET);

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  // Starting the Apollo Server
  await server.start();

  // Middleware to parse URL-encoded data and JSON
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Applying Apollo Server middleware with authentication context
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    // Serving the index.html file for any unknown routes
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Using defined routes
  app.use(routes);

  // Start the server once the database connection is established
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
}

// Initialize and start the Apollo Server
startApolloServer();
