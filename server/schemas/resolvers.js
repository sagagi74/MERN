const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // Query to find a user by ID or username
      const foundUser = await User.findOne({
        $or: [{ _id: context.user ? context.user._id : args.id }, { username: args.username }],
      });

      if (!foundUser) {
        console.log('Cannot find user');
        return null;
      }
      return foundUser;
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Can't find this user");
        }

        // Check if the password is correct
        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new Error('Wrong password!');
        }

        // Sign a token and return it along with the user
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log('Login error:', error); // Log login errors
        throw new Error('Login failed');
      }
    },
    addUser: async (parent, args) => {
      try {
        // Create a new user
        const user = await User.create(args);

        if (!user) {
          throw new Error('Something went wrong!');
        }

        // Sign a token and return it along with the user
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log('Add user error:', error); // Log add user errors
        throw new Error('Add user failed');
      }
    },
    saveBook: async (parent, { input }, context) => {
      try {
        // Find and update the user's saved books
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log('Save book error:', err); // Log save book errors
        throw new Error('Error saving book');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
        // Find and update the user's saved books by removing the specified book
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }

        return updatedUser;
      } catch (error) {
        console.log('Remove book error:', error); // Log remove book errors
        throw new Error('Error removing book');
      }
    },
  },
};

module.exports = resolvers;
