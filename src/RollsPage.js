import React, { useContext } from "react";

import { AppContext } from "./App";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Replay from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography";
import getPlayer from "./helpers/get-player";
import tinycolor from "tinycolor2";
import { useHistory } from "react-router-dom";

const Rolls = () => {
  const { client, rolls, lastRoll } = useContext(AppContext);
  const rollNumber = (number) =>
    client.send(
      JSON.stringify({
        type: "roll",
        number,
      })
    );
  const style = (number) => {
    const s =
      Number(number) === Number(lastRoll)
        ? {
            backgroundColor: "#eef4fc",
          }
        : {};
    return { width: "100%", paddingTop: "18px", paddingBottom: "18px", ...s };
  };
  return (
    <Grid container spacing={2} style={{ paddingTop: "10px" }}>
      {Object.keys(rolls).map((number) => (
        <Grid item xs={["6", "7", "8"].includes(number) ? 12 : 6} key={number}>
          <Button
            size="large"
            variant="outlined"
            onClick={() => rollNumber(number)}
            style={style(number)}
          >
            <Typography variant="h4">{number}</Typography>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default () => {
  const { client, lastRoll } = useContext(AppContext);
  const history = useHistory();
  const goToPage = (page) => history.push(page);

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
          onClick={() => goToPage("/home")}
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
