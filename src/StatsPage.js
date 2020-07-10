import * as d3 from "d3";

import React, { useContext, useEffect } from "react";

import { AppContext } from "./App";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

let svg;

const drawChart = (svg, rolls, lastRoll) => {
  const data = Object.entries(rolls).map(([number, value]) => ({
    number,
    value,
  }));
  const color = "steelblue";
  const margin = { top: 30, right: 0, bottom: 30, left: 40 };
  const width = parseInt(d3.select("#barchart").style("width"), 10);
  const height = parseInt(d3.select("#barchart").style("height"), 10);
  const max = d3.max(data, (d) => d.value);
  const axisFontSize = "18px";

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);
  const y = d3
    .scaleLinear()
    .domain([0, max])
    .range([height - margin.bottom, margin.top]);
  d3.format;
  const yAxis = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .style("font-size", axisFontSize)
      .call(d3.axisLeft(y).ticks(max))
      .call((g) =>
        g
          .append("text")
          .attr("x", -margin.left)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text(data.y)
      );

  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .style("font-size", axisFontSize)
      .call(
        d3
          .axisBottom(x)
          .tickFormat((i) => data[i].number)
          .tickSizeOuter(0)
      );
  const yAxisGrid = (g) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(-width).tickFormat("").ticks(max));
  svg.append("g").attr("color", "#afafaf").call(yAxisGrid);

  svg
    .append("g")
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("x", (d, i) => x(i))
    .attr("y", (d) => y(d.value))
    .attr("height", (d) => y(0) - y(d.value))
    .attr("width", x.bandwidth())
    .attr("fill", (d) => {
      return d.number === lastRoll ? "#46b482" : color;
    });
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
};

export default () => {
  const { rolls, lastRoll } = useContext(AppContext);
  const history = useHistory();
  const goToPage = (page) => history.push(page);

  useEffect(() => {
    if (svg) {
      svg.remove();
    }
    svg = d3
      .select("#barchart")
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    drawChart(svg, rolls, lastRoll);
  }, [rolls, lastRoll]);

  return (
    <Grid container>
      <Grid item xs={5}>
        <Button
          size="large"
          onClick={() => goToPage("home")}
          startIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
      </Grid>
      <div
        id="barchart"
        style={{
          position: "fixed",
          top: "15%",
          bottom: "15%",
          right: "10%",
          left: "5%",
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "8%",
          bottom: "85%",
          right: "10%",
          left: "5%",
          textAlign: "center",
        }}
      >
        {lastRoll && (
          <Typography variant="h4">Last Roll: {lastRoll}</Typography>
        )}
      </div>
    </Grid>
  );
};
