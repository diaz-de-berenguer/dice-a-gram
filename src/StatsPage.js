import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "./App";

export default () => {
  const { setActivePage, rolls } = useContext(AppContext);
  const goToPage = (page) => setActivePage(page);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button size="large" onClick={() => goToPage("home")}>
          Back
        </Button>
      </Grid>
      <Typography variant="h2" gutterBottom>
        Stats
      </Typography>
      {Object.entries(rolls).map(([number, value]) => (
        <Grid key={number} item xs={12}>
          <Typography variant="h4" gutterBottom>
            {number}: {value}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
