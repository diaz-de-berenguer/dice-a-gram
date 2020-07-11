import {
  AppBar,
  Dialog,
  Divider,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import React, { useContext, useState } from "react";

import { AppContext } from "./App";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

export default () => {
  const { client, players, rollCount } = useContext(AppContext);
  const history = useHistory();
  const goToPage = (page) => history.push(page);
  const [showAddPlayer, setShowAddPlayer] = useState(false);

  const addPlayer = (color) => {
    client.send(
      JSON.stringify({
        type: "addPlayer",
        player: color,
      })
    );
    setShowAddPlayer(false);
  };

  const close = () => setShowAddPlayer(false);

  const AddPlayer = () => {
    const availableColors = [
      "red",
      "orange",
      "blue",
      "silver",
      "green",
      "brown",
      "magenta",
      "black",
      "aliceblue",
    ].filter((color) => !players.includes(color));
    const height = window.innerHeight * 0.8;
    const paddingTop = window.innerHeight * 0.1;
    return (
      <Dialog fullScreen open={showAddPlayer} onClose={close}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h3">Add Player</Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={6}
          style={{ height, paddingTop }}
          alignItems="center"
          justify="center"
        >
          {availableColors.map((color, i) => {
            return (
              <React.Fragment key={color}>
                <Grid item xs={8}>
                  <Button
                    size="large"
                    style={{
                      width: "100%",
                      backgroundColor: color,
                      height: "50px",
                    }}
                    variant="contained"
                    onClick={() => addPlayer(color)}
                  ></Button>
                </Grid>
                {i !== 0 ? <Divider /> : ""}
              </React.Fragment>
            );
          })}
        </Grid>
      </Dialog>
    );
  };
  return (
    <>
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
      </Grid>
      {players.map((p, i) => (
        <Grid container key={p} style={{ marginTop: "50px" }}>
          <Grid item xs={3} style={{ textAlign: "center" }}>
            <Typography variant="h3" style={{ marginRight: "45px" }}>
              {i + 1}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <div style={{ backgroundColor: p, height: "100%" }}></div>
          </Grid>
        </Grid>
      ))}
      <Grid container style={{ marginTop: "100px" }} justify="center">
        <Grid item xs={6}>
          <Button
            size="large"
            variant="outlined"
            color="primary"
            onClick={() => setShowAddPlayer(true)}
            style={{ width: "100%" }}
            disabled={rollCount > 0}
          >
            <Typography variant="h4">Add Player</Typography>
          </Button>
        </Grid>
      </Grid>
      {showAddPlayer && <AddPlayer />}
    </>
  );
};
