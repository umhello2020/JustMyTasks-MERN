const { AuthenticationError } = require('apollo-server-express');
const { User, Task, Donation } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('your_stripe_secret_key');

const resolvers = {
  Query: {
    task: async (parent, { _id }) => {
      return Task.findById(_id);
    },
    tasks: async (parent, args, context) => {
      if (context.user) {
        return Task.find({ user: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('tasks');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    donation: async (parent, { _id }) => {
      return Donation.findById(_id);
    },
  },
  Mutation: {
    // ...existing mutation resolvers
    
    createDonation: async (parent, { amount }, context) => {
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to create a donation');
      }
    
      const donation = new Donation({
        amount,
        user: context.user._id,
      });
    
      await donation.save();
    
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe requires amount in cents
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {
          donationId: donation._id.toString(),
          userId: context.user._id.toString(),
        },
      });
      
    
      return {
        donation,
        clientSecret: paymentIntent.client_secret,
      };
    },
  },
};

module.exports = resolvers;




