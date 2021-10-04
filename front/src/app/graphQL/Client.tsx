import {
  ApolloClient,
  InMemoryCache
} from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blocks: {
          //...offsetLimitPagination(["time"]),
          keyArgs: ["time"],
          //...offsetLimitPagination(),
          read(existing, { args }) {
            if (!args) return undefined;
            return (
              existing && existing.slice(args.offset, args.offset + args.limit)
            );
            // A read function should always return undefined if existing is
            // undefined. Returning undefined signals that the field is
            // missing from the cache, which instructs Apollo Client to
            // fetch its value from your GraphQL server.
          },
          merge(existing, incoming, { args }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            if (args == null) {
              return undefined;
            }
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[args.offset + i] = incoming[i];
            }
            return merged;
          }
        }
      }
    }
  }
});

const CLIENT = new ApolloClient({
  uri: process.env.REACT_APP_BACKEND_URL,
  cache: cache,
  connectToDevTools: true,
});

export default CLIENT;
