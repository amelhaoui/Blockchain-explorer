import * as React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, Stack, Divider, Typography } from "@mui/material";
import { ArrowBackIos,  ArrowForwardIos } from "@mui/icons-material";
import { GetBlock_block } from "app/graphQL/__generated__/GetBlock";

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

const Header = (props: GetBlock_block) => {
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
                                startIcon={<ArrowBackIos />}
                                {...prop}
                            >
                                Previous Block <br /> {props.prev_block}
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
                <Grid item xs={12} lg={5} sx={{ textAlign: "right" }}>
                    <Link
                        to={props.next_block && props.next_block.length > 0 ? `/blocks/${props.next_block[0]}` : `#`}
                        component={React.forwardRef((prop, ref) => (
                            <Button
                                variant="outlined"
                                sx={{ color: "primary.dark", bgcolor: "primary.light" }}
                                endIcon={<ArrowForwardIos />}
                                {...prop}
                            >
                                Next Block <br /> {props.next_block && props.next_block.length > 0 ? props.next_block[0] : 'null'}
                            </Button>
                        ))}
                    />
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
                    value={`${NUMBER_FORMAT.format(parseInt(props.size))} bytes`}
                />
                <Title
                    title="Received time"
                    value={new Date(parseInt(`${props.time}000`)).toUTCString()}
                />
                <Title title="Fee" value={`${props.fee / Math.pow(10, 7)} BTC`} />
                <Title title="# of Transactions" value={String(props.n_tx)} />
            </Stack>
        </React.Fragment>
    );
};

export default Header;