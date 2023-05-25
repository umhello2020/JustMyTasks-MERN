import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';
import Nav from './components/Layout/Navbar';
import TaskPage from './pages/MyPage';
import { ApolloProvider, ApolloClient, InMemoryCache,} from '@apollo/client';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
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
