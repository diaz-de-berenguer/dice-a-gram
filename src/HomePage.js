import {
  Link,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import React, { useContext } from "react";

import { AppContext } from "./App";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export default () => {
  const { client } = useContext(AppContext);
  const history = useHistory();
  const goToPage = (page) => history.push(page);
  const reset = () =>
    client.send(
      JSON.stringify({
        type: "reset",
      })
    );
  const height = window.innerHeight * 0.8;
  const paddingTop = window.innerHeight * 0.1;
  return (
    <Grid
      container
      spacing={6}
      style={{ height, paddingTop }}
      alignItems="center"
    >
      <Grid item xs={12}>
        <Button
          size="large"
          style={{ width: "100%" }}
          variant="contained"
          color="primary"
          onClick={() => goToPage("/rolls")}
        >
          <Typography variant="h4">Rolls</Typography>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          size="large"
          style={{ width: "100%" }}
          variant="contained"
          color="primary"
          onClick={() => goToPage("/stats")}
        >
          <Typography variant="h4">Stats</Typography>
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          size="large"
          style={{ width: "100%" }}
          variant="outlined"
          onClick={reset}
        >
          <Typography variant="h4">Reset</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};
