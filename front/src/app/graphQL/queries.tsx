import { gql } from "@apollo/client";

const GET_BLOCKS = gql`
  query GetBlocks($time: String!, $offset: Int!, $limit: Int!) {
    blocks(time: $time, offset: $offset, limit: $limit) {
      size
      offset
      limit
      data {
        hash
        time
        height
      }
    }
  }
`;

const GET_BLOCK = gql`
  query GetBlock($hash: ID!) {
    block(hash: $hash) {
      hash
      time
      height
      size
      block_index
      fee
      prev_block
      next_block
      n_tx
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions($hash: ID!, $page: Int!) {
    transactions(hash: $hash, page: $page) {
        hash
        tx_index
        size
      }
  }
` 

export { GET_BLOCKS, GET_BLOCK, GET_TRANSACTIONS};
