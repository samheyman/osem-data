import "./App.css";
import React from "react";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useCurrentActiveUsersData } from "./hooks/useCurrentActiveUsersData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useProjectsLocationsData } from "./hooks/useProjectsLocationsData";
import { useAssetsData } from "./hooks/useAssetsData";
import { useHistoricalUsersData } from "./hooks/useHistoricalUsersData";
import { useWorldMapData } from "./hooks/useWorldMapData";
import { Header } from "./Header";
import { Marks } from "./Marks";
import { GeoMarks } from "./GeoMarks";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { AssetsMap } from "./AssetsMap";
import { useProjectUsersData } from "./hooks/useProjectUsersData";
import { useProjectPowerData } from "./hooks/useProjectPowerData";

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

const projectList = ["seagreen", "st-brieuc", "moray_west", "dogger_bank"];

const getMonthName = (date) => {
  return monthList[date.getMonth()];
};
const getPreviousMonth = (month) => monthList[monthList.indexOf(month) - 1];

function App() {
  // React.useEffect(() => {
  //   setAss
  // }, [projectName]);
  const [date, setDate] = React.useState(
    "jul"
    // getPreviousMonth(getMonthName(new Date()))
  );
  const [numberOfUsers, setNumberOfUsers] = React.useState(0);
  const [projectName, setProjectName] = React.useState("seagreen");

  let currentActiveUsersData = useCurrentActiveUsersData(date);
  let worldMapData = useWorldMapData();
  let projectsData = useProjectsData();
  let projectsLocationsData = useProjectsLocationsData();
  let historicalUsersData = useHistoricalUsersData("jul");
  let projectUsersData = useProjectUsersData();
  let projectPowerData = useProjectPowerData();
  let assetsData = useAssetsData(projectName);
  // console.log(projectPowerData);

  const updateDate = (e) => {
    setDate(e.target.value);
  };
  const updateProject = (e) => {
    setProjectName(e.target.value);
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
    !assetsData ||
    assetsData.value.length < 1
  ) {
    return <pre>... loading ...</pre>;
  }

  const totalCurrentUsers = currentActiveUsersData.reduce(
    (partialSum, a) => partialSum + a.Users,
    0
  );
  // animateValue("numberOfUsers", 0, 12000, 1, linear);
  const totalProjectGw =
    projectPowerData
      .map((project) => project.Power)
      .reduce((prev, next) => prev + next) / 1000;
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const usersyValue = (d) => d["project name"];
  const usersxValue = (d) => d.Users;
  const poweryValue = (d) => d["project name"];
  const powerxValue = (d) => d.Power;
  const siFormat = format(".2s");
  // const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");
  const xAxisTickFormat = (tickValue) => tickValue;

  const usersyScale = scaleBand()
    .domain(projectUsersData.map(usersyValue))
    .range([0, innerHeight])
    .padding(0.15);

  const usersxScale = scaleLinear()
    .domain([0, max(projectUsersData, usersxValue)])
    .range([0, innerWidth]);

  const poweryScale = scaleBand()
    .domain(projectPowerData.map(poweryValue))
    .range([0, innerHeight])
    .padding(0.15);

  const powerxScale = scaleLinear()
    .domain([0, max(projectPowerData, powerxValue)])
    .range([0, innerWidth]);

  const totalOsemCapacity = projectsData.reduce(
    (totalSum, a) => totalSum + a.totalCapacityMW,
    0
  );

  const totalNumberOfTurbines = projectsData.reduce(
    (partialSum, a) => partialSum + a.turbines,
    0
  );

  const numberOfActiveWindfarmsOM = projectsData.filter(
    (project) =>
      project.type === "windfarm - O&M" && project.status === "active"
  ).length;
  const numberOfActiveWindfarmsConstr = projectsData.filter(
    (project) =>
      project.type === "windfarm - constr." && project.status === "active"
  ).length;
  const numberOfActiveProjects = projectsData.filter(
    (project) => project.status === "active"
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
          LAST UPDATED NOV 22, 2023
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
        {/* <h3>Projects</h3> */}
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
            <div className="key-numbers__title">Live projects</div>
            <div className="key-numbers__value">{numberOfActiveProjects}</div>
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
            <div className="key-numbers__title">Windfarms</div>
            <div className="key-numbers__value">
              {numberOfActiveWindfarmsOM + numberOfActiveWindfarmsConstr}
            </div>
          </div>
          <div>
            <div className="key-numbers__title">Total GW</div>
            <div className="key-numbers__value">{totalProjectGw}</div>
          </div>
          {/* <div>
            <div className="key-numbers__title">Number of turbines</div>
            <div className="key-numbers__value">{totalNumberOfTurbines}</div>
          </div>
          <div>
            <div className="key-numbers__title">Total capacity</div>
            <div className="key-numbers__value">
              {Math.round((totalOsemCapacity / 1000) * 10) / 10}
              <span>GW</span>
            </div>
          </div> */}
        </div>
        <div>
          <span className="legend">
            * Users on an active project who have not terminated their contract
          </span>
        </div>
        <h2>Users by project</h2>
        <div className="chart">
          <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
              <AxisBottom
                xScale={usersxScale}
                innerHeight={innerHeight}
                tickFormat={xAxisTickFormat}
              />
              <AxisLeft yScale={usersyScale} />
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
                data={projectUsersData}
                xScale={usersxScale}
                yScale={usersyScale}
                xValue={usersxValue}
                yValue={usersyValue}
                tooltipFormat={xAxisTickFormat}
              />
            </g>
          </svg>
        </div>
        <h2>Project Power Capacity (MW) </h2>
        <div>
          <code>{JSON.stringify(poweryScale)}</code>
        </div>
        <div className="chart">
          <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
              <AxisBottom
                xScale={powerxScale}
                innerHeight={innerHeight}
                tickFormat={xAxisTickFormat}
              />
              <AxisLeft yScale={poweryScale} />
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
                data={projectPowerData}
                xScale={powerxScale}
                yScale={poweryScale}
                xValue={powerxValue}
                yValue={poweryValue}
                tooltipFormat={xAxisTickFormat}
              />
            </g>
          </svg>
        </div>
        {/* <div>** Since Jan 2022</div> */}
        {/* <h2>Projects Maps</h2>
        <div>
          <div className="form-container flex flex-row">
            <label htmlFor="standard-select">Select project</label>
            <br />
            <div className="select">
              <select
                id="standard-select"
                name="project"
                onChange={updateProject}
                value={projectName}
              >
                {projectList.map((project, i) => (
                  <option key={i} value={project}>
                    {project}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <br />
          <br />
          <AssetsMap assetsData={assetsData.value} /> */}
        {/* <pre>{JSON.stringify(assetsData.children)}</pre> */}
        {/* <table style={{ border: "1px solid #999" }}>
            {assetsData.value.map((asset, key) => {
              return (
                <tr key={key}>
                  <td style={{ border: "1px solid #999" }}>{key + 1}</td>
                  <td style={{ border: "1px solid #999" }}>{asset.Name}</td>
                  <td style={{ border: "1px solid #999" }}>
                    {asset.TypeName} ({asset.TypeCode})
                  </td>
                  <td style={{ border: "1px solid #999" }}>{asset.Latitude}</td>
                  <td style={{ border: "1px solid #999" }}>
                    {asset.Longitude}
                  </td>
                  <td style={{ border: "1px solid #999" }}>
                    {asset.CurrentAccessRestrictionStatusName && (
                      <span>
                        Access restriction:{" "}
                        {asset.CurrentAccessRestrictionStatusName}
                        <br />
                      </span>
                    )}
                    {asset.CurrentCustodyStatusName && (
                      <span>
                        Custody Status: {asset.CurrentCustodyStatusName}
                        <br />
                      </span>
                    )}
                    {asset.CurrentOperationalStatusName && (
                      <span>
                        Operational Status: {asset.CurrentOperationalStatusName}
                        <br />
                      </span>
                    )}
                    {asset.CurrentPowerStatusName && (
                      <span>
                        Power Status: {asset.CurrentPowerStatusName}
                        <br />
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </table> */}
        {/* <pre>{JSON.stringify(projectsAndCompanies)}</pre> */}
        {/* <ProjectsAndCompanies data={projectsAndCompanies} /> */}
        {/* </div> */}
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
        <h2>Windfarms in construction</h2>
        {projectsData && (
          <>
            <table className="capacity">
              <thead>
                <tr>
                  <td style={{ textAlign: "left" }}>Project name</td>
                  <td style={{ textAlign: "left" }}>Number of users</td>
                </tr>
              </thead>
              <tbody>
                {projectsData
                  .filter(
                    (a, b) =>
                      a.status === "active" && a.type === "windfarm - constr."
                  )
                  .sort((a, b) =>
                    parseInt(a["active users"], 10) <
                    parseInt(b["active users"], 10)
                      ? 0
                      : -1
                  )
                  .map((d, id) => {
                    // if (d.totalCapacityMW > 0) {
                    return (
                      <tr key={id}>
                        <td style={{ textAlign: "left" }}>{d.name}</td>
                        <td style={{ textAlign: "left" }}>
                          {d["active users"]}
                        </td>
                      </tr>
                    );
                    // }
                  })}
              </tbody>
            </table>
          </>
        )}
        <h2>Windfarms in O&M</h2>
        {projectsData && (
          <>
            <table className="capacity">
              <thead>
                <tr>
                  <td style={{ textAlign: "left" }}>Project name</td>
                  <td style={{ textAlign: "left" }}>Number of users</td>
                </tr>
              </thead>
              <tbody>
                {projectsData
                  .filter(
                    (a, b) =>
                      a.status === "active" && a.type === "windfarm - O&M"
                  )
                  .sort((a, b) =>
                    parseInt(a["active users"], 10) <
                    parseInt(b["active users"], 10)
                      ? 0
                      : -1
                  )
                  .map((d, id) => {
                    // if (d.totalCapacityMW > 0) {
                    return (
                      <tr key={id}>
                        <td style={{ textAlign: "left" }}>{d.name}</td>
                        <td style={{ textAlign: "left" }}>
                          {d["active users"]}
                        </td>
                      </tr>
                    );
                    // }
                  })}
              </tbody>
            </table>
          </>
        )}
        <h2>Past Windfarms</h2>
        {projectsData && (
          <>
            <table className="capacity">
              <thead>
                <tr>
                  <td style={{ textAlign: "left" }}>Project name</td>
                  <td style={{ textAlign: "left" }}>Number of active users</td>
                </tr>
              </thead>
              <tbody>
                {projectsData
                  .filter((a, b) => {
                    return (
                      a.status !== "active" &&
                      (a.type === "windfarm - constr." ||
                        a.type === "windfarm - O&M")
                    );
                  })
                  .sort((a, b) =>
                    a["active users"] < b["active users"] ? 0 : -1
                  )
                  .map((d, id) => {
                    // if (d.totalCapacityMW > 0) {
                    return (
                      <tr key={id}>
                        <td style={{ textAlign: "left" }}>{d.name}</td>
                        <td style={{ textAlign: "left" }}>
                          {d["active users"]}
                        </td>
                      </tr>
                    );
                    // }
                  })}
              </tbody>
            </table>
          </>
        )}
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
      </div>
    </>
  );
}

export default App;
