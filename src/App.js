import "./App.css";
import React from "react";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useData } from "./hooks/useData";
import { Header } from "./Header";
import { Marks } from "./Marks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";

const width = 900;
const height = 600;
const margin = { top: 20, right: 30, bottom: 100, left: 220 };
const xAxisLabelOffset = 70;

const monthList = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

const getMonthName = (date) => {
  return monthList[date.getMonth()];
};
const getPreviousMonth = (month) => monthList[monthList.indexOf(month) - 1];

function App() {
  const [date, setDate] = React.useState(
    getPreviousMonth(getMonthName(new Date()))
  );
  let data = useData(date);

  const updateDate = (e) => {
    setDate(e.target.value);
  };
  if (!data) {
    return <pre>... loading ...</pre>;
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["Project name"];
  const xValue = (d) => d.Users;
  const siFormat = format(".2s");
  // const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
  const xAxisTickFormat = (tickValue) => tickValue;

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .range([0, innerHeight])
    .padding(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <div className="App">
      <Header />
      <div className="form-container flex flex-row">
        <label for="standard-select">Select month</label>
        {/* <form className="date-selector"> */}
        <div className="select">
          <select
            id="standard-select"
            name="month"
            onChange={updateDate}
            value={date}
          >
            {monthList.map((month) => (
              <option key={month} value={month}>
                {month} 2022
              </option>
            ))}
          </select>
        </div>
        {/* </form> */}
      </div>
      <h1>OSEM data</h1>
      <p className="ff-heading fw-400">
        Based on data from{" "}
        <span className="fw-700">Performance environment</span>.
      </p>
      <p className="last-updated ff-heading fw-400">
        LAST UPDATED JULY 14, 2022
      </p>
      <div className="chart">
        {" "}
        <svg width={width} height={height}>
          <g transform={`translate(${margin.left},${margin.top})`}>
            <AxisBottom
              xScale={xScale}
              innerHeight={innerHeight}
              tickFormat={xAxisTickFormat}
            />
            <AxisLeft yScale={yScale} />
            <text
              className="axis-label"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset}
              textAnchor="middle"
            >
              Number of users
            </text>
            <text
              className="axis-label-note"
              x={innerWidth / 2}
              y={innerHeight + xAxisLabelOffset + 20}
              textAnchor="middle"
            >
              Number of users by project, based on data from performance env.
            </text>
            <Marks
              data={data}
              xScale={xScale}
              yScale={yScale}
              xValue={xValue}
              yValue={yValue}
              tooltipFormat={xAxisTickFormat}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
