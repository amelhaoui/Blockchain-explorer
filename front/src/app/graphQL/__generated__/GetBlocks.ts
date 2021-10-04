/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBlocks
// ====================================================

export interface GetBlocks_blocks_data {
  __typename: "BlockSummary";
  hash: string;
  time: string;
  height: number;
}

export interface GetBlocks_blocks {
  __typename: "BlocksResponse";
  size: number;
  offset: number;
  limit: number;
  data: (GetBlocks_blocks_data | null)[];
}

export interface GetBlocks {
  blocks: GetBlocks_blocks;
}

export interface GetBlocksVariables {
  time: string;
  offset: number;
  limit: number;
}
