import "./App.css";
import React from "react";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useCurrentActiveUsersData } from "./hooks/useCurrentActiveUsersData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useProjectsLocationsData } from "./hooks/useProjectsLocationsData";
import { useProjectsAndCompaniesData } from "./hooks/useProjectsAndCompaniesData";
import { useHistoricalUsersData } from "./hooks/useHistoricalUsersData";
import { useWorldMapData } from "./hooks/useWorldMapData";
import { Header } from "./Header";
import { Marks } from "./Marks";
import { GeoMarks } from "./GeoMarks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { ProjectsAndCompanies } from "./ProjectsAndCompanies";

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
  "jul",
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
  // React.useEffect(() => {
  //   console.log(projectsAndCompanies);
  // }, []);
  const [date, setDate] = React.useState(
    "jul"
    // getPreviousMonth(getMonthName(new Date()))
  );
  const [numberOfUsers, setNumberOfUsers] = React.useState(0);

  let currentActiveUsersData = useCurrentActiveUsersData(date);
  let worldMapData = useWorldMapData();
  let projectsData = useProjectsData();
  let projectsLocationsData = useProjectsLocationsData();
  let historicalUsersData = useHistoricalUsersData("jul");
  let projectsAndCompanies = useProjectsAndCompaniesData();

  const updateDate = (e) => {
    setDate(e.target.value);
  };

  // React.useEffect(() => {
  //   animateValue("numberOfUsers", 0, totalNumberOfUsers, linear);
  // }, []);

  if (
    !currentActiveUsersData ||
    !worldMapData ||
    !projectsData ||
    !projectsLocationsData ||
    !historicalUsersData ||
    !projectsAndCompanies
  ) {
    return <pre>... loading ...</pre>;
  }

  const totalCurrentUsers = currentActiveUsersData.reduce(
    (partialSum, a) => partialSum + a.Users,
    0
  );
  // animateValue("numberOfUsers", 0, 12000, 1, linear);

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yValue = (d) => d["project name"];
  const xValue = (d) => d.Users;
  const siFormat = format(".2s");
  // const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
  const xAxisTickFormat = (tickValue) => tickValue;

  const yScale = scaleBand()
    .domain(historicalUsersData.map(yValue))
    .range([0, innerHeight])
    .padding(0.15);

  const xScale = scaleLinear()
    .domain([0, max(historicalUsersData, xValue)])
    .range([0, innerWidth]);

  const totalOsemCapacity = projectsData.reduce(
    (totalSum, a) => totalSum + a.totalCapacityMW,
    0
  );

  const totalNumberOfTurbines = projectsData.reduce(
    (partialSum, a) => partialSum + a.turbines,
    0
  );

  const numberOfActiveWindfarms = projectsData.filter(
    (project) => project.type === "windfarm"
  ).length;
  const numberOfActiveProjects = projectsData.filter(
    (project) => project.type === "other"
  ).length;
  const percentageChangeInUsers = Math.round(
    ((totalCurrentUsers - 11756) / 11756) * 100
  );

  return (
    <>
      <Header />

      <div className="App">
        <h1>OSEM data</h1>
        <p className="ff-heading fw-400">
          Based on copy of <span className="fw-700">production data</span>.
        </p>
        <p className="last-updated ff-heading fw-400">
          LAST UPDATED AUG 01, 2022
        </p>
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
        <h2>Key figures</h2>
        <h3>Projects</h3>
        <div className="key-numbers">
          <div>
            <div className="key-numbers__title">Active users*</div>
            <div className="key-numbers__value" id="numberOfUsers">
              {totalCurrentUsers}{" "}
              {/* <span>
                {percentageChangeInUsers >= 0 ? "+" : "-"}
                {percentageChangeInUsers}%**
              </span> */}
            </div>
          </div>
          <div>
            <div className="key-numbers__title">Active windfarms</div>
            <div className="key-numbers__value">{numberOfActiveWindfarms}</div>
          </div>
          {/* <div>
            <div className="key-numbers__title">Total users</div>
            <div className="key-numbers__value" id="">
              {totalCurrentUsers}{" "}
              <span>
                {percentageChangeInUsers >= 0 ? "+" : "-"}
                {percentageChangeInUsers}%**
              </span>
            </div>
          </div>
       */}
          <div>
            <div className="key-numbers__title">Number of turbines</div>
            <div className="key-numbers__value">{totalNumberOfTurbines}</div>
          </div>
          <div>
            <div className="key-numbers__title">Total capacity</div>
            <div className="key-numbers__value">
              {Math.round((totalOsemCapacity / 1000) * 10) / 10}
              <span>GW</span>
            </div>
          </div>
          <div>
            <div className="key-numbers__title">Other active projects</div>
            <div className="key-numbers__value">{numberOfActiveProjects}</div>
          </div>
        </div>
        <div>
          <span className="legend">
            * Users on an active project who have not terminated their contract
          </span>
        </div>
        {/* <div>** Since Jan 2022</div> */}
        <h2>Projects and companies</h2>
        <div>
          {/* <pre>{JSON.stringify(projectsAndCompanies)}</pre> */}
          <ProjectsAndCompanies data={projectsAndCompanies} />
        </div>
        <h2>Windfarms</h2>
        <div className="globe__container">
          {worldMapData && worldMapData.land ? (
            <>
              <svg width={width} height={height} className="globe">
                <GeoMarks
                  data={worldMapData}
                  projects={projectsLocationsData}
                />
              </svg>
            </>
          ) : (
            <pre>Loading...</pre>
          )}
        </div>
        <div>
          <span className="legend">
            Windfarm locations, size respresents offical installed capacity (MW)
          </span>
        </div>
        <h2>Windfarm capacity</h2>
        {/* <p>
          Vissim's software is currently deployed and used across more than{" "}
          <span>{totalOsemCapacity / 1000}</span>GW of wind project development
          and operations in Europe and Asia.
        </p> */}
        {projectsData && (
          <>
            <table className="capacity">
              <thead>
                <tr>
                  <td>Project name</td>
                  <td>Number of turbines*</td>
                  <td>Turbine capacity</td>
                  <td>Calculated capacity (MW)</td>
                  <td>Official capacity (MW)**</td>
                </tr>
              </thead>
              <tbody>
                {projectsData
                  .sort((a, b) =>
                    a.totalCapacityMW < b.totalCapacityMW ? 0 : -1
                  )
                  .map((d, id) => {
                    // if (d.totalCapacityMW > 0) {
                    return (
                      <tr key={id}>
                        <td>{d.name}</td>
                        <td>{d.turbines}</td>
                        <td>{d.turbineCapacityMW}</td>
                        <td>{d.turbineCapacityCalcMW}</td>
                        <td>{d.totalCapacityMW}</td>
                      </tr>
                    );
                    // }
                  })}
              </tbody>
            </table>
            <div>
              <span className="legend">
                * Number of turbines x turbine capacity
                <br />
                ** Based on data from windfarm website
              </span>
            </div>
          </>
        )}{" "}
        <h2>Number of users</h2>
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
                data={historicalUsersData}
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
