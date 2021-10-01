import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { GET_BLOCKS } from "app/graphQL/queries";
import { NetworkStatus, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, TextField, Grid } from "@mui/material";
import timeAgo from "config/timeFormat";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
  ul: {
    justifyContent: "right",
  },
});

const Header = (prop: { children?: React.ReactNode }) => {
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="space-between"
        alignContent="flex-end"
        sx={{ mt: 5 }}
      >
        <Grid item>
          <Typography variant="h5" component="p">
            Latest Blockchain Blocks
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ color: "primary.dark", fontSize: 13, lineHeight: 0.8 }}
          >
            The mined blocks in the last 24 hours
          </Typography>
        </Grid>
        <Grid item>{prop.children}</Grid>
      </Grid>
    </React.Fragment>
  );
};
export default function EnhancedTable() {
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
      notifyOnNetworkStatusChange: true,
    }
  );

  const history = useHistory();

  const onTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDate = new Date(event.target.value);
    if (newDate.toString() === "Invalid Date") {
      newDate = new Date();
    }
    setDates(newDate);
  };

  const handleClick = (event: React.MouseEvent<unknown>, hash: string) => {
    history.push(`/blocks/${hash}`);
  };

  const onChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    fetchMore({
      variables: {
        offset: (page - 1) * 10,
      },
    }).then((fetchMoreResult) => {
      // Update variables.limit for the original query to include
      setPage(page);
    });
  };

  if (networkStatus === NetworkStatus.refetch) return <div>'Refetching!'</div>;

  if (loading)
    return (
      <React.Fragment>
        <Header />

        <Box sx={{ display: "flex", mt: 10, justifyContent: "center" }}>
          <CircularProgress color="secondary" size={"5rem"} />
        </Box>
      </React.Fragment>
    );

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
      <TableContainer component={Paper} sx={{ boxShadow: 0, mt: 0, mb: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="end"
          sx={{ mt: 1 }}
          rowSpacing={2}
        >
          <Grid item></Grid>
        </Grid>

        <Table sx={{ minWidth: 650 }} aria-label="latest blocks">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "primary.dark" }}>Hash</TableCell>
              <TableCell sx={{ color: "primary.dark" }} align="right">
                Height
              </TableCell>
              <TableCell sx={{ color: "primary.dark" }} align="right">
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.blocks.map((row: any) => (
              <TableRow
                hover
                classes={{ root: classes.row }}
                onClick={(event) => handleClick(event, row.hash)}
                key={row.hash}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.hash}
                </TableCell>
                <TableCell align="right">{row.height}</TableCell>
                <TableCell align="right">
                  {timeAgo.format(parseInt(`${row.time}000`))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={10}
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
