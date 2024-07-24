const {User} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query:{
   // me: async (parent,{ user = null, params }) => {
    //  const foundUser = await User.findOne({
     //   $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    //  });
    //  if (!foundUser) {
      //  console.log('Cannot find user')
       // return null;
     // } 
     // return foundUser;
   // }
//  },
me: async (parent, args, context) => {
  if (context.user) {
    return User.findOne({ _id: context.user._id });
  }
  throw new AuthenticationError('You need to be logged in!');
},
},
  Mutation: {
    //login: async (parent,{body}) =>{
   ///   const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    //  if (!user) {
    //    throw new Error ("Can't find this user" );
    //  }

    //  const correctPw = await user.isCorrectPassword(body.password);

    //  if (!correctPw) {
       // throw new Error ('Wrong password!');
     // }
    //  const token = signToken(user);
     // return { token, user };
   // },

   login: async (parent, { email, password }) => {
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
  },




    addUser: async (parent,body) => {
      console.log(body);
      const user = await User.create(body);

      if (!user) {
        throw new Error ('Cannot create User!');
      }
      const token = signToken(user);

      return { token, user };
    },
    saveBook: async (parent, {input} ,context) => {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: input } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        return AuthenticationError;
      }
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );

        if (!updatedUser) {
          throw new Error("Couldn't find user with this id!");
        }
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;