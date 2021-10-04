import * as React from "react";
import { Typography, Grid } from "@mui/material";

const Header = (props: { children?: React.ReactNode }) => {
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
                <Grid item>{props.children}</Grid>
            </Grid>
        </React.Fragment>
    );
};

export default Header;