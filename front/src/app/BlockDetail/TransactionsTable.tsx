import * as React from "react";
import { TableRow, Paper, TableHead, TableContainer, TableCell, TableBody, Table } from "@mui/material";

import { GetTransactions_transactions } from "app/graphQL/__generated__/GetTransactions";

const NUMBER_FORMAT = new Intl.NumberFormat();

const TransactionsTable = (props: { transactions: Array<GetTransactions_transactions> }) => {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 0 }}>
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
                    {props.transactions.map((transaction: GetTransactions_transactions) => (
                        <TableRow
                            hover
                            key={transaction.hash}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {transaction.hash}
                            </TableCell>
                            <TableCell align="right">{transaction.tx_index}</TableCell>
                            <TableCell align="right">
                                {NUMBER_FORMAT.format(transaction.size)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
};

export default TransactionsTable;