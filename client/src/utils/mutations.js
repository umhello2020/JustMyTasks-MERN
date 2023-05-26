import { gql } from '@apollo/client';

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

export const UPDATE_TASK = gql`
  mutation UpdateTask($_id: ID!, $title: String, $description: String, $completed: Boolean) {
    updateTask(_id: $_id, title: $title, description: $description, completed: $completed) {
      _id
      title
      description
      completed
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($_id: ID!) {
    deleteTask(_id: $_id) {
      _id
      title
      description
      completed
    }
  }
`;

export const CREATE_DONATION = gql`
    mutation CreateDonation($_id: ID!, $amount: Float!) {
        createDonation(_id: $_id, amount: $amount) {
            donationId
            amount
            createdAt
            task {
                _id
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
                    _id
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
                    _id
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
                    _id
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
                _id
                title
                description
                completed
            }
        }
    }
`;






