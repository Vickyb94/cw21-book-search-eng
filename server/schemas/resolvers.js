//import dependencies
const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User
                     .findOne({ _id: context.user._id})
                     .select("__v -pasword")
             return userData;
            }
            throw new AuthenticationError("User is not logged in!");

        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.$where.create(args);
            const token = signToken(user);
            return{token, user};
        },
        login: async (parent, { email, password }) => {
               const user = await User.findOne({ email });
               if (!user) {
                 throw new AuthenticationError("Wrong credentials!");

               };
               const correctPW = await user.isCorrectPassword(password);
              if (!correctPW) {
                throw new AuthenticationError("Wrong credentials!");
              };
              const token = signToken(user);
              return { token, user };
            },
        saveBook: async (parent, { bookData }, context) => {
            if(context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true },
                )
                .populate("books");
            return updateUser;
            };
            throw new AuthenticationError("User must be logged in to save books");
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user,_id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true },
            );
             return updatedUser;
        };
        throw new AuthenticationError("User must be logged in to delete books");
        }
    },
};

module.exports = resolvers;
