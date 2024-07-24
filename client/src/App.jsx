import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link.context';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Creates an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Sets the authorization token in the headers for requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Creates an Apollo Client instance with auth and HTTP links, and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Main App component, provides Apollo Client to the rest of the app
function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
