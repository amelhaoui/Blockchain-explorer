import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { TableRow, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { GET_BLOCK } from "app/graphQL/queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Button, Grid, Stack, Divider } from "@mui/material";
import timeAgo from "config/timeFormat";
import { TitleOutlined } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const NUMBER_FORMAT = new Intl.NumberFormat();
const Title = (prop: { value: string; title: string }) => (
  <React.Fragment>
    <Stack direction="column">
      <Typography
        variant="h4"
        component="p"
        sx={{ fontWeight: 600, fontSize: 14 }}
      >
        {prop.title}
      </Typography>
      <Typography
        sx={{
          mt: 0,
          flexGrow: 1,
          color: "primary.dark",
          fontSize: 15,
          lineHeight: 1,
        }}
      >
        {prop.value}
      </Typography>
    </Stack>
  </React.Fragment>
);

const Header = (props: any) => {
  return (
    <React.Fragment>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 5, mb: 2 }}
      >
        <Grid item xs={12} lg={5}>
          <Link
            to={`/blocks/${props.prev_block}`}
            component={React.forwardRef((prop, ref) => (
              <Button
                variant="outlined"
                sx={{ color: "primary.dark", bgcolor: "primary.light" }}
                startIcon={<ArrowBackIosIcon />}
                {...prop}
              >
                Previous Block {props.prev_block}
              </Button>
            ))}
          />
        </Grid>
        <Grid item xs={12} lg={2}>
          <Typography
            component="p"
            sx={{ fontWeight: 600, fontSize: 40, textAlign: "center" }}
          >
            Block {props.block_index}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Button
            variant="outlined"
            sx={{ color: "primary.dark", bgcolor: "primary.light" }}
            endIcon={<ArrowForwardIosIcon />}
          >
            Next Block {props.next_block}
          </Button>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ justifyContent: "center", textAlign: "center" }}
      >
        <Title
          title="Size"
          value={`${NUMBER_FORMAT.format(props.size)} bytes`}
        />
        <Title
          title="Received time"
          value={new Date(parseInt(`${props.time}000`)).toUTCString()}
        />
        <Title title="Fee" value={`${props.fee / Math.pow(10, 7)} BTC`} />
        <Title title="# of Transactions" value={props.n_tx} />
      </Stack>
    </React.Fragment>
  );
};

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
  ul: {
    justifyContent: "right",
  },
});

export default function ETable() {
  const classes = useStyles();
  const { hash } = useParams<{ hash: string }>();
  const { loading, error, data } = useQuery(GET_BLOCK, { variables: { hash } });

  // if (networkStatus === NetworkStatus.refetch) return <div>'Refetching!'</div>;

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
      <Header {...data.block} />
      <TableContainer component={Paper} sx={{ boxShadow: 0, mt: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{ mt: 2 }}
          rowSpacing={2}
        >
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
        <Table sx={{ minWidth: 650 }} aria-label="latest blocks">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "primary.dark" }}>Hash</TableCell>
              <TableCell sx={{ color: "primary.dark" }} align="right">
                Index
              </TableCell>
              <TableCell sx={{ color: "primary.dark" }} align="right">
                Size (bytes)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.block.tx.map((transaction: any) => (
              <TableRow
                hover
                className={classes.row}
                key={transaction.hash}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {transaction.hash}
                </TableCell>
                <TableCell align="right">{transaction.tx_index}</TableCell>
                <TableCell align="right">
                  {NUMBER_FORMAT.format(transaction.size)}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}
