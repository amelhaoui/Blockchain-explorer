import { ApolloServer, gql } from "apollo-server-express";
import BlocksAPI from "datasources/BlocksAPI";
import resolvers from "schema/resolvers";
import typeDefs from "schema/schema";

// copied from front
const GET_BLOCKS = gql`
  query GetBlocks($time: String!, $offset: Int!, $limit: Int!) {
    blocks(time: $time, offset: $offset, limit: $limit) {
      hash
      height
      time
    }
  }
`;

describe('API integration', () => {
    it('fetches 10 blocks', async () => {
        // create a test server to test against, using our production typeDefs,
        // resolvers, and dataSources.
        const server = new ApolloServer({
            typeDefs,
            resolvers,
            dataSources: () => ({ BlocksAPI: new BlocksAPI() }),
        });
        const res = await server.executeOperation({ query: GET_BLOCKS, variables: { time: "1633272354897", offset: 0, limit: 10} });
        expect(res).toMatchSnapshot();
    });
});