import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "app/Home";
import BlockDeail from "app/BlockDetail";
import AppWrapper from "app/AppBar";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Router>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Switch>
          <Route path="/blocks/:hash">
            <AppWrapper>
              <BlockDeail />
            </AppWrapper>
          </Route>
          <Route path="/">
            <AppWrapper>
              <Home />
            </AppWrapper>
          </Route>
        </Switch>
      </Box>
    </Router>
  );
}
