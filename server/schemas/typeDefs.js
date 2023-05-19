const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Auth {
    token: ID!
    user: User
  }

  type User {
    userId: ID!
    username: String!
    email: String!
    taskCount: Int!
    tasks: [Task]!
  }

  type Task {
    taskId: ID!
    title: String!
    description: String
    completed: Boolean
    user: User
  }

  type Donation {
    donationId: ID!
    task: Task!
    amount: Float!
    user: User!
    createdAt: String!
  }

  type Query {
    task(taskId: ID!): Task!
    tasks: [Task!]!
    me: User
  }

  type Mutation {
    createUser(userId: ID!, username: String!, email: String!, password: String!): Auth
    updateUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
    createTask(title: String!, description: String!): Task
    updateTask(taskId: ID!, title: String, description: String, completed: Boolean): Task
    deleteTask(taskId: ID!): Task!
    createDonation(taskId: ID!, amount: Float!): Donation
  }
`;

module.exports = typeDefs;
