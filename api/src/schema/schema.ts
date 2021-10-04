import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type BlockSummary {
      hash: ID!
      time: String!
      height: Int!
  }

  type BlocksResponse {
    size: Int!
    offset: Int!
    limit: Int!
    data: [BlockSummary]!
  }

  type BlockDetail {
      hash: ID!
      time: String!
      height: Int!
      size: String!
      block_index: Int!
      fee: Int!
      prev_block: String!
      next_block: [String]
      n_tx: Int!
      tx: [Transaction]!
  }

  type Transaction {
    hash: String!
    tx_index: String!
    size: Int!
  }

  type Query {
    blocks(time: String!, offset: Int!, limit: Int!): BlocksResponse!
    block(hash: ID!): BlockDetail!
    transactions(hash: ID!, page: Int!): [Transaction]!
  }
`



export default typeDefs;