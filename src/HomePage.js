import React, { useContext } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "./App";

export default () => {
  const { setActivePage, client } = useContext(AppContext);
  const goToPage = (page) => setActivePage(page);
  const reset = () =>
    client.send(
      JSON.stringify({
        type: "reset",
      })
    );
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => goToPage("rolls")}
        >
          Rolls
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          size="large"
          variant="contained"
          color="primary"
          onClick={() => goToPage("stats")}
        >
          Stats
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large" variant="outlined" onClick={reset}>
          Reset
        </Button>
      </Grid>
    </Grid>
  );
};
