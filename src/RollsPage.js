import React, { useContext } from "react";

import { AppContext } from "./App";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
    <Grid container spacing={2} style={{ paddingTop: "10px" }}>
      {Object.keys(rolls).map((number) => (
        <Grid item xs={6}>
          <Button
            key={number}
            size="large"
            variant="outlined"
            onClick={() => rollNumber(number)}
            style={{ width: "100%", paddingTop: "18px", paddingBottom: "18px" }}
          >
            <Typography variant="h4">{number}</Typography>
          </Button>
        </Grid>
      ))}
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
      <Rolls />
    </Grid>
  );
};
