import React, { useContext } from "react";

import { AppContext } from "./App";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Replay from "@material-ui/icons/Replay";
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
        <Grid item xs={6} key={number}>
          <Button
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
  const { setActivePage, client, lastRoll } = useContext(AppContext);
  const goToPage = (page) => setActivePage(page);
  const undoRoll = () => {
    client.send(
      JSON.stringify({
        type: "undo",
      })
    );
  };
  return (
    <Grid container>
      <Grid item xs={6}>
        <Button
          size="large"
          onClick={() => goToPage("home")}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Grid>
      <Grid item xs={6}>
        {lastRoll && (
          <Button
            size="large"
            onClick={() => undoRoll()}
            style={{ width: "100%" }}
            startIcon={<Replay />}
          >
            Undo
          </Button>
        )}
      </Grid>
      <Rolls />
    </Grid>
  );
};
