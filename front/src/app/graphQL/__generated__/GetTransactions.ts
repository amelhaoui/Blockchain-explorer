/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTransactions
// ====================================================

export interface GetTransactions_transactions {
  __typename: "Transaction";
  hash: string;
  tx_index: string;
  size: number;
}

export interface GetTransactions {
  transactions: (GetTransactions_transactions | null)[];
}

export interface GetTransactionsVariables {
  hash: string;
  page: number;
}
