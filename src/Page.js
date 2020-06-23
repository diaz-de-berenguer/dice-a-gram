import React, { useContext } from "react";
import { AppContext } from "./App";
import HomePage from "./HomePage";
import RollsPage from "./RollsPage";
import StatsPage from "./StatsPage";

export default () => {
  const { activePage } = useContext(AppContext);
  if (activePage === "rolls") {
    return <RollsPage />;
  }
  if (activePage === "stats") {
    return <StatsPage />;
  }
  return <HomePage />;
};
