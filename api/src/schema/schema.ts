import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type BlockSummary {
      hash: ID!
      time: String!
      height: Int!
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
    blocks(time: String!, offset: Int!, limit: Int!): [BlockSummary]!
    block(hash: ID!): BlockDetail!
  }
`



export default typeDefs;