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

export const LOGIN_USER = gql`
    mutation LoginUser($email: String!, $password: String!) {
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

export const ADD_USER = gql`
    mutation AddUser($username: String!, $email: String!, $password: String!) {
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
    mutation UpdateUser($username: String!, $email: String!, $password: String!) {
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

export const ADD_TASK= gql`
    mutation AddTask($title: String!, $description: String!) {
        addTask(title: $title, description: $description) {
            taskId
            title
            description
            completed
        }
    }
`;




