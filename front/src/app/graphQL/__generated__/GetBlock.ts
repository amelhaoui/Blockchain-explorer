/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetBlock
// ====================================================

export interface GetBlock_block {
  __typename: "BlockDetail";
  hash: string;
  time: string;
  height: number;
  size: string;
  block_index: number;
  fee: number;
  prev_block: string;
  next_block: (string | null)[] | null;
  n_tx: number;
}

export interface GetBlock {
  block: GetBlock_block;
}

export interface GetBlockVariables {
  hash: string;
}
