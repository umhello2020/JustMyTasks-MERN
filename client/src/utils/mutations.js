import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $description: String!) {
    createTask(title: $title, description: $description) {
      taskId
      title
      description
      completed
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: ID!, $title: String, $description: String, $completed: Boolean) {
    updateTask(taskId: $taskId, title: $title, description: $description, completed: $completed) {
      taskId
      title
      description
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($taskId: ID!) {
    deleteTask(taskId: $taskId) {
      taskId
      title
      description
      completed
    }
  }
`;

export const CREATE_DONATION = gql`
    mutation CreateDonation($taskId: ID!, $amount: Float!) {
        createDonation(taskId: $taskId, amount: $amount) {
            donationId
            amount
            createdAt
            task {
                taskId
                title
                description
                completed
            }
            user {
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
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
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
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
            token
            user {
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
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($username: String!, $email: String!, $password: String!) {
        updateUser(username: $username, email: $email, password: $password) {
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






