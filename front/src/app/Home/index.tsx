import * as React from "react";
import { GET_BLOCKS } from "app/graphQL/queries";
import { NetworkStatus, useQuery } from "@apollo/client";
import { makeStyles } from "@mui/styles";
import { Box, TextField, Pagination, CircularProgress, LinearProgress } from "@mui/material";

import Header from "./Header";
import BlocksTable from "./BlocksTable";

const useStyles = makeStyles({
  ul: {
    justifyContent: "right",
  }
});

export default function HomePage() {
  const classes = useStyles();
  const [dates, setDates] = React.useState(new Date());
  const [page, setPage] = React.useState(1);

  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    GET_BLOCKS,
    {
      variables: {
        time: dates.getTime().toString(),
        offset: (page - 1) * 10,
        limit: 10,
      },
      notifyOnNetworkStatusChange: true
    }
  );

  const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDate = new Date(event.target.value);
    if (newDate.toString() === "Invalid Date") {
      newDate = new Date();
    }
    setDates(newDate);
  };

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchMore({
      variables: {
        offset: (page - 1) * 10,
      },
    }).then(() => {
      // Update variables.limit for the original query to include
      setPage(page);
    });
  };
  

  if (loading && networkStatus === NetworkStatus.loading) {
    return (
      <React.Fragment>
        <Header />
        <Box sx={{ display: "flex", mt: 10, justifyContent: "center" }}>
          <CircularProgress color="secondary" size={"5rem"} />
        </Box>
      </React.Fragment>
    );
  }

  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <React.Fragment>
      <Header>
        <TextField
          label="From"
          type="datetime-local"
          defaultValue={dates.toISOString().slice(0, -8)}
          onChange={onTimeChange}
        />
      </Header>
      <BlocksTable {...data} />
      {networkStatus === NetworkStatus.fetchMore && <LinearProgress color="secondary" />}
      <Pagination
        count={data && data.blocks && !isNaN(data.blocks.size) ? Math.ceil(data.blocks.size/10) : 1}
        page={page}
        onChange={onChangePage}
        color="secondary"
        shape="rounded"
        size="medium"
        classes={{ ul: classes.ul }}
      />
    </React.Fragment>
  );
}
