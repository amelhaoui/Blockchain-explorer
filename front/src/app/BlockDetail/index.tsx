import * as React from "react";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box, CircularProgress, Pagination} from "@mui/material";

import Header from "./Header";
import TransactionsTable from "./TransactionsTable";

import { GetBlock_block } from "app/graphQL/__generated__/GetBlock";
import { GET_BLOCK, GET_TRANSACTIONS } from "app/graphQL/queries";

const useStyles = makeStyles({
  ul: {
    justifyContent: "right",
  },
});


export default function BlockDetailPage() {
  const classes = useStyles();
  const [page, setPage] = React.useState(1);

  const { hash } = useParams<{ hash: string}>();
  const { loading, error, data } = useQuery(GET_BLOCK, { variables: { hash }});

  const {data: transactionsData, loading: loadingTransactions, fetchMore} = useQuery(GET_TRANSACTIONS, {variables: {hash, page}} );

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchMore({
      variables: {
        hash,
        page
      },
    }).then(() => {
      setPage(page);
    });
  };

  if (loading || loadingTransactions) {
    const loadingDATA: GetBlock_block = {
      hash: "-----",
      time: "-----",
      height: -1,
      size: "-----",
      block_index: -1,
      fee: 0,
      prev_block: "-----",
      next_block: null,
      n_tx: 0,
      __typename: "BlockDetail"
    };

    return (
      <React.Fragment>
        <Header {...loadingDATA} />
        <Box sx={{ display: "flex", mt: 10, justifyContent: "center" }}>
          <CircularProgress color="secondary" size={"5rem"} />
        </Box>
      </React.Fragment>
    );
  }
    

  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <React.Fragment>
      <Header {...data.block} />
      <Pagination
        count={10}
        page={page}
        onChange={onChangePage}
        color="secondary"
        shape="rounded"
        size="medium"
        classes={{ ul: classes.ul }}
        sx={{mt: 3}}
      />
      <TransactionsTable {...transactionsData} />
    </React.Fragment>
  );
}
