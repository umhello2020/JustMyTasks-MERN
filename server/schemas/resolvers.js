const { AuthenticationError } = require('apollo-server-express');
const { User, Task, Donation } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('your_stripe_secret_key');

const resolvers = {
    Query: {
        task: async (parent, { taskId }) => {
            return Task.findById(taskId);
        },
        tasks: async (parent, args, context) => {
            if (context.user) {
                return Task.find({ user: context.user.userId });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findById(context.user.userId).populate('tasks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        updateUser: async (parent, { username, email, password }, context) => {
            if (context.user) {
                return User.findByIdAndUpdate(
                    context.user.userId,
                    { username, email, password },
                    { new: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createTask: async (parent, { title, description }, context) => {
            if (context.user) {
                const task = await Task.create({
                    title,
                    description,
                    user: context.user.userId,
                });

                await User.findByIdAndUpdate(context.user.userId, {
                    $push: { tasks: task.taskId },
                });

                return task;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updateTask: async (parent, { taskId, title, description, completed }, context) => {
            if (context.user) {
                const update = { title, description, completed };
                const options = { new: true };

                return Task.findByIdAndUpdate(taskId, update, options);
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        deleteTask: async (parent, { taskId }, context) => {
            if (context.user) {
                const task = await Task.findByIdAndRemove(taskId);

                await User.findByIdAndUpdate(context.user.userId, {
                    $pull: { tasks: task.taskId },
                });

                return task;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        createDonation: async (parent, { taskId, amount }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to create a donation');
            }

            const task = await Task.findById(taskId);
            if (!task) {
                throw new Error('Task not found');
            }

            const donation = new Donation({
                task: taskId,
                amount,
                user: context.user.userId,
            });

            await donation.save();

            // Create a Stripe PaymentIntent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100), // Stripe requires amount in cents
                currency: 'usd',
                payment_method_types: ['card'],
                metadata: {
                    donationId: donation._id.toString(),
                    taskId: taskId.toString(),
                    userId: context.user.userId.toString(),
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




