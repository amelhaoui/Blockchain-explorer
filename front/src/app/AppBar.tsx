import * as React from "react";
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Toolbar, Typography, AppBar } from "@mui/material";

import { ReactComponent as Logo } from "resources/logo.svg";
interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export default function AppWrapper({ children }: Props): JSX.Element {
  return (
    <React.Fragment>
      <Box >
        <AppBar position="static" sx={{ borderBottom: 3 }}>
          <Container maxWidth="xl">
            <Toolbar>
              <Link to="/">
                <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
                  <Logo width={50} height={50} />
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

      <Box sx={{ mt: 6 }}>
        <AppBar position="static" sx={{ borderTop: 3 }}>
          <Container maxWidth="xl">
            <Toolbar>
              © Copyright 2021 - Challenge
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </React.Fragment>
  );
}
