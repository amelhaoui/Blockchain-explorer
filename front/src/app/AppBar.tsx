import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box, Container } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactComponent as NuriLogo } from "resources/logo.svg";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const useStyles = makeStyles({
  box: {
    boxShadow: "0px",
  },
  //    toolbar: {backgroundColor: "#f0f0f0"}, // a nested style rule
});

export default function AppWrapper({ children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box >
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar>
              <Link to="/">
                <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                  <NuriLogo width={50} height={50} />
                </IconButton>
              </Link>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Blockchain Client
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <Container maxWidth="xl">{children}</Container>
    </React.Fragment>
  );
}
