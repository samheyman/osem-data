import { scaleBand, scaleLinear, max } from "d3";
import { AxisBottom } from "../AxisBottom";
import { AxisLeft } from "../AxisLeft";
import { Bars } from "./Bars";

export const HistogramChart = ({
  data,
  value1,
  value2,
  value3,
  value1Name,
  value2Name,
}) => {
  const width = 950;
  const height = 930;
  const margin = { top: 20, right: 30, bottom: 100, left: 220 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;
  const xValue = (d) => Number(d[value3]);
  const x1Value = (d) => Number(d[value1]);
  const x2Value = (d) => Number(d[value2]);
  const yValue = (d) => d.Name;

  const xAxisTickFormat = (tickValue) => tickValue;
  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);
  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.15);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginRight: "20px",
          fontSize: 12,
        }}
      >
        <div
          style={{ display: "flex", marginRight: "30px", alignItems: "center" }}
        >
          <div
            style={{
              backgroundColor: "#2786b4",
              minHeight: "20px",
              minWidth: "20px",
              marginRight: "10px",
            }}
          ></div>
          {value1Name}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: "#c2bdbd",
              minHeight: "20px",
              minWidth: "20px",
              marginRight: "10px",
            }}
          ></div>
          {value2Name}
        </div>
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
          />
          <AxisLeft yScale={yScale} />
          <Bars
            data={data}
            xScale={xScale}
            yScale={yScale}
            x1Value={x1Value}
            x2Value={x2Value}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
          />
        </g>
      </svg>
    </>
  );
};
