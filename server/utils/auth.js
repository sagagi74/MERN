const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Custom authentication error using GraphQL
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),

  // Middleware function for authenticated routes
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.query or headers
    let token = req.query?.token || req.headers?.authorization;

    // If authorization header is present, extract the token
    if (req.headers?.authorization) {
      token = req.headers.authorization.split(' ').pop().trim();
    }

    // If no token is found, log and return the request object as is
    if (!token) {
      console.log("no token found");
      return req;
    }

    // Verify the token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data; // Attach the user data to the request object
    } catch {
      console.log('Invalid token');
      return req; // If token is invalid, return the request object as is
    }

    // Return the request object to the next endpoint
    return req;
  },

  // Function to sign a token with user data
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id }; // Create a payload with user data

    // Sign and return the token with the payload, secret, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
