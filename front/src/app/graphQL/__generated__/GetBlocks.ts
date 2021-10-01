/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBlocks
// ====================================================

export interface GetBlocks_blocks {
  __typename: "BlockSummary";
  hash: string;
  height: number;
  time: string;
}

export interface GetBlocks {
  blocks: (GetBlocks_blocks | null)[];
}

export interface GetBlocksVariables {
  time?: string | null;
  offset?: number | null;
  limit?: number | null;
}
