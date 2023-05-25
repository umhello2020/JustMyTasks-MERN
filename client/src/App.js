import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink,} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './App.css';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';
import Nav from './components/Layout/Navbar';
import TaskPage from './pages/MyPage';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" element={< HomePage />} />
          <Route exact path="/tasks" element={< TaskPage />} />
          <Route exact path="/login" element={< LoginPage />} />
          <Route exact path="/signup" element={< SignupPage />} />
          <Route component={NotFound} />
        </Routes>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
