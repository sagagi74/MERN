// GraphQL type definitions for queries and mutations
const typeDefs = `
  type Query {
    // Gets the logged-in user's info
    me: User
  }
  
  type User {
    _id: ID
    username: String
    email: String
    savedBooks: [Book]
  }
  
  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }
  
  type Auth {
    token: String
    user: User
  }
  
  input SaveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: ID
    image: String
    link: String
  }
  
  type Mutation {
    // Logs in a user with email and password, returns token and user info
    login(email: String!, password: String!): Auth
    
    // Adds a new user and returns token and user info
    addUser(username: String!, email: String!, password: String!): Auth
    
    // Saves a book to the user's savedBooks list, returns updated user info
    saveBook(input: SaveBookInput!): User
    
    // Removes a book from the user's savedBooks list by book ID, returns updated user info
    removeBook(bookId: ID): User
  }
`;

module.exports = typeDefs;
