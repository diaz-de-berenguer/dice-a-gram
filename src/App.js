import "./App.css";

import { Dialog, DialogTitle } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Page from "./Page";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { hot } from "react-hot-loader/root";

const SERVER =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:8000"
    : "wss://dice-a-gram-server.herokuapp.com";

const getClient = () => new W3CWebSocket(SERVER);
let client = getClient();

const initialRolls = {
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
};

export const AppContext = React.createContext({
  rolls: initialRolls,
  setRolls: () => {},
  client,
  rollCount: 0,
  players: [],
});

let pingTimer;

const ping = (setConnected) => {
  try {
    client.send(
      JSON.stringify({
        type: "__ping__",
      })
    );
  } catch (error) {
    console.log("unable to send ping. Error:", error);
  }
  pingTimer = setTimeout(function () {
    setConnected(false);
    location.reload();
  }, 2000);
};

const App = () => {
  // const [activePage, setActivePage] = useState("home");
  const [rolls, setRolls] = useState(initialRolls);
  const [lastRoll, setLastRoll] = useState();
  const [connected, setConnected] = useState(false);
  const [players, setPlayers] = useState([]);
  const [rollCount, setRollCount] = useState(0);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
      ping(setConnected);
      setConnected(true);
    };
    client.onclose = () => {
      setConnected(false);
    };
    client.onmessage = ({ data }) => {
      const _data = JSON.parse(data);
      if (_data.type === "data") {
        const {
          rolls: newRolls,
          lastRoll,
          rollCount: newrollCount,
          players: newPlayers,
        } = _data;
        setRolls(newRolls);
        setLastRoll(lastRoll);
        setRollCount(newrollCount);
        setPlayers(newPlayers);
      }
      if (_data.type === "reset") {
        setRolls(initialRolls);
        setLastRoll(undefined);
      }
      if (_data.type === "__pong__") {
        clearTimeout(pingTimer);
        setTimeout(() => ping(setConnected), 1000);
        setConnected(true);
      }
    };
  });

  return (
    <div className="App">
      <AppContext.Provider
        value={{ rolls, setRolls, client, lastRoll, rollCount, players }}
      >
        <Page />
      </AppContext.Provider>
      <Dialog open={!connected}>
        <DialogTitle id="dialog-title">Disconnected</DialogTitle>
      </Dialog>
    </div>
  );
};

export default hot(App);
