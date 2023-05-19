import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';
import Nav from './components/Layout/Navbar';
import TaskPage from './pages/MyPage';
import { ApolloProvider, ApolloClient, InMemoryCache,} from '@apollo/client';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),

});

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/tasks" component={TaskPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route component={NotFound} />
        </Routes>
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
