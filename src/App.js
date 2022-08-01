import "./App.css";
import React from "react";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useProjectUserData } from "./hooks/useProjectUserData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useGeoData } from "./hooks/useGeoData";
import { Header } from "./Header";
import { Marks } from "./Marks";
import { GeoMarks } from "./GeoMarks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { animateValue, linear } from "./utils";

const width = 960;
const height = 430;
const margin = { top: 20, right: 30, bottom: 100, left: 220 };
const xAxisLabelOffset = 70;

const monthList = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  // "jul",
  // "aug",
  // "sep",
  // "oct",
  // "nov",
  // "dec",
];

const getMonthName = (date) => {
  return monthList[date.getMonth()];
};
const getPreviousMonth = (month) => monthList[monthList.indexOf(month) - 1];

function App() {
  const [date, setDate] = React.useState(
    "jun"
    // getPreviousMonth(getMonthName(new Date()))
  );
  const [numberOfUsers, setNumberOfUsers] = React.useState(0);

  let projectUserData = useProjectUserData(date);
  let geoData = useGeoData();
  let projectsData = useProjectsData();

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  // React.useEffect(() => {
  //   animateValue("numberOfUsers", 0, totalNumberOfUsers, linear);
  // }, []);

  if (!projectUserData || !geoData || !projectsData) {
    return <pre>... loading ...</pre>;
  }
  const totalNumberOfUsers = projectUserData.reduce(
    (partialSum, a) => partialSum + a.Users,
    0
  );
  // animateValue("numberOfUsers", 0, 12000, 1, linear);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["Project name"];
  const xValue = (d) => d.Users;
  const siFormat = format(".2s");
  // const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
  const xAxisTickFormat = (tickValue) => tickValue;

  const yScale = scaleBand()
    .domain(projectUserData.map(yValue))
    .range([0, innerHeight])
    .padding(0.15);

  const xScale = scaleLinear()
    .domain([0, max(projectUserData, xValue)])
    .range([0, innerWidth]);

  const totalOsemCapacity = projectsData.reduce(
    (totalSum, a) => totalSum + a.totalCapacityMW,
    0
  );

  const totalNumberOfTurbines = projectsData.reduce(
    (partialSum, a) => partialSum + a.turbines,
    0
  );

  const numberOfActiveProjects = projectsData.length;

  return (
    <>
      <Header />

      <div className="App">
        <h1>OSEM data</h1>
        <p className="ff-heading fw-400">
          Based on data from{" "}
          <span className="fw-700">Performance environment</span>.
        </p>
        <p className="last-updated ff-heading fw-400">
          LAST UPDATED AUG 1, 2022
        </p>
        <h2>Project locations</h2>
        <div className="">
          {geoData && geoData.land ? (
            <svg width={width} height={height} className="globe">
              <GeoMarks data={geoData} projects={projectsData} />
            </svg>
          ) : (
            <pre>Loading...</pre>
          )}
        </div>
        <h2>Key figures</h2>
        <div className="key-numbers">
          <div>
            <div className="key-numbers__title">Number of projects</div>
            <div className="key-numbers__value">{numberOfActiveProjects}</div>
          </div>

          <div>
            <div className="key-numbers__title">Number of users</div>
            <div className="key-numbers__value" id="numberOfUsers">
              {totalNumberOfUsers}
            </div>
          </div>
          <div>
            <div className="key-numbers__title">
              Total wind project capacity
            </div>
            <div className="key-numbers__value">
              {Math.round((totalOsemCapacity / 1000) * 10) / 10}
              <span>GW</span>
            </div>
          </div>
          <div>
            <div className="key-numbers__title">Number of turbines</div>
            <div className="key-numbers__value">{totalNumberOfTurbines}</div>
          </div>
        </div>
        <h2>Project capacity</h2>
        {/* <p>
          Vissim's software is currently deployed and used across more than{" "}
          <span>{totalOsemCapacity / 1000}</span>GW of wind project development
          and operations in Europe and Asia.
        </p> */}
        {projectsData && (
          <table className="capacity">
            <thead>
              <tr>
                <td>Project name</td>
                <td>Number of turbines</td>
                {/* <td>Turbine capacity</td>
                <td>Turbine type</td> */}
                <td>Total capacity (MW)</td>
              </tr>
            </thead>
            {projectsData
              .sort((a, b) => (a.totalCapacityMW < b.totalCapacityMW ? 0 : -1))
              .map((d) => {
                // if (d.totalCapacityMW > 0) {
                return (
                  <tr>
                    <td>{d.name}</td>
                    <td>{d.turbines}</td>
                    {/* <td>{d.turbineCapacityMW}</td>
                      <td>{d.turbineType}</td> */}
                    <td>{d.totalCapacityMW}</td>
                  </tr>
                );
                // }
              })}
          </table>
        )}{" "}
        <h2>Number of users</h2>
        {/* <div className="form-container flex flex-row">
          <label htmlFor="standard-select">Select month</label>
          <br />
          <div className="select">
            <select
              id="standard-select"
              name="month"
              onChange={updateDate}
              value={date}
            >
              {monthList.map((month, i) => (
                <option key={i} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="select">
            <select
              id="standard-select"
              name="year"
              onChange={updateDate}
              value="2022"
            >
              <option value="2022">2022</option>
            </select>
          </div>
        </div> */}
        <div className="chart">
          <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
              <AxisBottom
                xScale={xScale}
                innerHeight={innerHeight}
                tickFormat={xAxisTickFormat}
              />
              <AxisLeft yScale={yScale} />
              {/* <text
                className="axis-label"
                x={innerWidth / 2 - 50}
                y={innerHeight + xAxisLabelOffset}
                textAnchor="middle"
              >
                Number of users
              </text>
              <text
                className="axis-label-note"
                x={innerWidth / 2 - 50}
                y={innerHeight + xAxisLabelOffset + 20}
                textAnchor="middle"
              >
                Number of users by project, based on data from performance env.
              </text> */}
              <Marks
                data={projectUserData}
                xScale={xScale}
                yScale={yScale}
                xValue={xValue}
                yValue={yValue}
                tooltipFormat={xAxisTickFormat}
              />
            </g>
          </svg>
        </div>{" "}
      </div>
    </>
  );
}

export default App;
