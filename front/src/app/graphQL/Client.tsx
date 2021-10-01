import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

import { offsetLimitPagination } from "@apollo/client/utilities";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        blocks: {
          //...offsetLimitPagination(["time"]),
          keyArgs: ["time"],
          //...offsetLimitPagination(),
          read(existing, { args }) {
            console.log(args);
            console.table(existing);
            if (!args) return undefined;
            return (
              existing && existing.slice(args.offset, args.offset + args.limit)
            );
            //console.log(args.offset, args.limit)
            // A read function should always return undefined if existing is
            // undefined. Returning undefined signals that the field is
            // missing from the cache, which instructs Apollo Client to
            // fetch its value from your GraphQL server.
          },
          merge(existing, incoming, { args }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            console.log(incoming);
            console.log(args);
            console.log(existing);
            if (args == null) {
              return undefined;
            }
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[args.offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
  },
});

const CLIENT = new ApolloClient({
  uri: "https://nuri-challenge-backend.herokuapp.com/graphql",
  cache: cache,
  connectToDevTools: true,
});

export default CLIENT;
