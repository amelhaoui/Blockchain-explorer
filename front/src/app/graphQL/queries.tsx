import { gql } from "@apollo/client";

const GET_BLOCKS = gql`
  query GetBlocks($time: String!, $offset: Int!, $limit: Int!) {
    blocks(time: $time, offset: $offset, limit: $limit) {
      hash
      height
      time
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
      n_tx
      tx {
        hash
        tx_index
        size
      }
    }
  }
`;

export { GET_BLOCKS, GET_BLOCK };
