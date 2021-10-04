import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client";

const cache = new InMemoryCache();

const CLIENT = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: cache,
  connectToDevTools: true,
});

export default CLIENT;
