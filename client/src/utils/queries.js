import { gql } from '@apollo/client';

export const GET_TASK = gql`
  query GetTask($taskId: ID!) {
    task(taskId: $taskId) {
      taskId
      title
      description
      completed
    }
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      taskId
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
        taskId
        title
        description
        completed
      }
    }
  }
`;

