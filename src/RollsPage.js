import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { AppContext } from "./App";

const Rolls = () => {
  const { client, rolls } = useContext(AppContext);
  const rollNumber = (number) =>
    client.send(
      JSON.stringify({
        type: "roll",
        number,
      })
    );

  return (
    <Grid container spacing={3}>
      {
        <Grid item xs={6}>
          {Object.keys(rolls).map((number) => (
            <Button
              key={number}
              size="large"
              variant="outlined"
              onClick={() => rollNumber(number)}
            >
              {number}
            </Button>
          ))}
        </Grid>
      }
    </Grid>
  );
};

export default () => {
  const { setActivePage } = useContext(AppContext);
  const goToPage = (page) => setActivePage(page);
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button size="large" onClick={() => goToPage("home")}>
          Back
        </Button>
      </Grid>
      <Typography variant="h2" gutterBottom>
        Rolls
      </Typography>
      <Rolls />
    </Grid>
  );
};
