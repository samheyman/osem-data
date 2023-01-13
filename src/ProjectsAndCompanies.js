import React from "react";
import { hierarchy, scaleBand, scaleLinear, max } from "d3";

export const ProjectsAndCompanies = ({ data }) => {
  const width = 800;
  const height = 500;
  const margin = { top: 20, right: 30, bottom: 100, left: 140 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const yValue = (d) => d.name;
  const xValue = (d) => d.children;

  const yScale = scaleBand()
    .domain(data.children.map(yValue))
    .range([0, innerHeight])
    .padding(0.4);
  console.log(data.children);
  const maxNumberOfValues = data.children.map(xValue).map((arr) => arr.length);
  const xScale = scaleLinear().domain([0, 29]).range([0, innerWidth]);

  const xAxisTickFormat = (tickValue) => tickValue;
  console.log(maxNumberOfValues);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {xScale.ticks().map((tickValue, id) => {
          return (
            <g
              className="tick"
              key={id}
              transform={`translate(${xScale(tickValue)},0)`}
            >
              <line y2={innerHeight} stroke="black" />
              <text
                style={{ textAnchor: "middle" }}
                dy=".71em"
                y={innerHeight + 3}
              >
                {xAxisTickFormat(tickValue)}
              </text>
            </g>
          );
        })}
        {yScale.domain().map((tickValue, id) => (
          <g className="tick" key={id}>
            <text
              style={{ textAnchor: "end" }}
              x={-3}
              dy=".32em"
              y={yScale(tickValue) + yScale.bandwidth() / 2}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {data.children.map((d, id) => {
          console.log(d);
          return (
            <rect
              className="mark"
              key={id}
              x={0}
              y={yScale(yValue(d))}
              width={xScale(xValue(d).length)}
              height={yScale.bandwidth()}
            >
              {/* <title>{xAxisTickFormat(xValue(d).n)}</title> */}
            </rect>
          );
        })}
      </g>
    </svg>
  );
};
