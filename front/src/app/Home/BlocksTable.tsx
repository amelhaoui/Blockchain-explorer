import * as React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import {
    Paper, TableRow, Grid, TableHead, TableContainer,
    TableCell, TableBody, Table
} from "@mui/material";

import { GetBlocks_blocks } from "app/graphQL/__generated__/GetBlocks";
import timeAgo from "config/timeFormat";

const useStyles = makeStyles({
    row: {
        cursor: "pointer",
    }
});

const BlocksTable = (props: {blocks : GetBlocks_blocks} ) => {
    const classes = useStyles();
    const history = useHistory();
    const handleClick = (event: React.MouseEvent<unknown>, hash: string) => {
        history.push(`/blocks/${hash}`);
    };

    return (
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
                    {props.blocks && props.blocks.data.map((row: any) => (
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
    )
}

export default BlocksTable;