import React from "react";
import { hierarchy, scaleBand, scaleLinear, max } from "d3";

export const ProjectsAndCompanies = ({ data }) => {
  // console.log(data.companies);

  const width = 1000;
  const height = 1000;
  const margin = { top: 20, right: 250, bottom: 100, left: 80 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const yValue = (d) => d.name;
  const xValue = (d) => d;

  const yScale = scaleBand()
    .domain(data.companies.map(yValue))
    .range([0, innerHeight])
    .padding(0.4);
  // const maxNumberOfValues = data.companies.map(xValue).map((arr) => arr.length);
  const xScale = scaleLinear().domain([0, 3000]).range([0, innerWidth]);

  const xAxisTickFormat = (tickValue) => tickValue;

  return (
    <svg width={width} height={height} style={{ border: "1px solid grey" }}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        <g transform={`translate(210)`}>
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
        </g>
        {yScale.domain().map((tickValue, id) => (
          <g className="tick" key={id}>
            <text
              style={{ textAnchor: "end" }}
              x={200}
              dy=".32em"
              y={yScale(tickValue) + yScale.bandwidth() / 2}
            >
              {tickValue}
            </text>
          </g>
        ))}
        {data.companies.map((d, id) => {
          return (
            <rect
              className="mark"
              key={id}
              x={210}
              y={yScale(yValue(d))}
              width={xScale(xValue(d.size))}
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
