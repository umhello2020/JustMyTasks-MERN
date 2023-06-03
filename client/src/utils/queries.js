import { gql } from '@apollo/client';

export const GET_TASK = gql`
  query GetTask($_id: ID!) {
    task(_id: $_id) {
      _id
      title
      description
      completed
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      _id
      title
      description
      completed
    }
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      _id
      username
      email
      taskCount
      tasks {
        _id
        title
        description
        completed
      }
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      _id
      title
      description
      completed
    }
  }
`;
