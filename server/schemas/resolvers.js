const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
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
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("Can't find this user");
        }

        const correctPw = await user.isCorrectPassword(password);

        if (!correctPw) {
          throw new Error('Wrong password!');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log('Login error:', error); // Add this line to log login errors
        throw new Error('Login failed');
      }
    },
    addUser: async (parent, args) => {
      try {
        const user = await User.create(args);

        if (!user) {
          throw new Error('Something went wrong!');
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.log('Add user error:', error); // Add this line to log add user errors
        throw new Error('Add user failed');
      }
    },
    saveBook: async (parent, { input }, context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log('Save book error:', err); // Add this line to log save book errors
        throw new Error('Error saving book');
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      try {
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
        console.log('Remove book error:', error); // Add this line to log remove book errors
        throw new Error('Error removing book');
      }
    },
  },
};

module.exports = resolvers;
