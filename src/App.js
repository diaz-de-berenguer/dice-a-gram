import { hot } from "react-hot-loader/root";
import React, { useEffect, useState } from "react";
import "./App.css";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Page from "./Page";

const client = new W3CWebSocket("ws://127.0.0.1:8000");

const initialRolls = {
  1: 0,
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
  activePage: "",
  setActivePage: () => {},
  rolls: initialRolls,
  setRolls: () => {},
  client,
});

const App = () => {
  const [activePage, setActivePage] = useState("home");
  const [rolls, setRolls] = useState(initialRolls);
  console.log("rolls", rolls);

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = ({ data }) => {
      console.log("data", data);
      const _data = JSON.parse(data);
      if (_data.type === "roll") {
        const { rolls: newRolls } = _data;
        setRolls(newRolls);
      }
      if (_data.type === "reset") {
        setRolls(initialRolls);
      }
    };
  });

  return (
    <div className="App">
      <AppContext.Provider
        value={{ activePage, setActivePage, rolls, setRolls, client }}
      >
        <Page />
      </AppContext.Provider>
    </div>
  );
};

export default hot(App);
