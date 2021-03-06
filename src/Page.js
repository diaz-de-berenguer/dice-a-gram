import { Link, Route, HashRouter as Router, Switch } from "react-router-dom";
import React, { useContext } from "react";

import { AppContext } from "./App";
import HomePage from "./HomePage";
import PlayersPage from "./PlayersPage";
import RollsPage from "./RollsPage";
import StatsPage from "./StatsPage";

export default () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
      <Route path="/rolls">
        <RollsPage />
      </Route>
      <Route path="/stats">
        <StatsPage />
      </Route>
      <Route path="/players">
        <PlayersPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </Router>
);
// const { activePage } = useContext(AppContext);
// if (activePage === "rolls") {
//   return <RollsPage />;
// }
// if (activePage === "stats") {
//   return <StatsPage />;
// }
// return <HomePage />;
