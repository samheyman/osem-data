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

import { GeoMarksEurope } from "./GeoMarksEurope";
import { GeoMarksAsia } from "./GeoMarksAsia";
import { GeoMarksUS } from "./GeoMarksUS";

const width = 1800;
const height = 1000;

function App() {
  let worldMapData = useWorldMapData();
  let projectsLocationsData = useProjectsLocationsData();
  if (!worldMapData || !projectsLocationsData) {
    return <pre>... loading ...</pre>;
  }

  return (
    <>
      <Header />

      <div className="App">
        <h2>Europe</h2>
        <div className="globe__container">
          <div
            style={{
              position: "relative",
              width: "200px",
              top: "80px",
              left: "20px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              fontFamily: "Source Sans Pro",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="red"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>Construction</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#3da5ff"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>O&M</span>
            </div>
          </div>
          {worldMapData && worldMapData.land ? (
            <svg width={width} height={height} className="globe">
              <GeoMarksEurope
                data={worldMapData}
                projects={projectsLocationsData}
              />
            </svg>
          ) : (
            <pre>Loading...</pre>
          )}
        </div>
        <h2>Asia</h2>
        <div className="globe__container">
          <div
            style={{
              position: "relative",
              width: "200px",
              top: "80px",
              left: "20px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              fontFamily: "Source Sans Pro",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="red"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>Construction</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#3da5ff"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>O&M</span>
            </div>
          </div>
          {worldMapData && worldMapData.land ? (
            <svg width={width} height={height} className="globe">
              <GeoMarksAsia
                data={worldMapData}
                projects={projectsLocationsData}
              />
            </svg>
          ) : (
            <pre>Loading...</pre>
          )}
        </div>{" "}
        <h2>USA</h2>
        <div className="globe__container">
          <div
            style={{
              position: "relative",
              width: "200px",
              top: "80px",
              left: "20px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              zIndex: 1000,
              fontFamily: "Source Sans Pro",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="red"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>Construction</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg width="20" height="20">
                <circle
                  cx="10"
                  cy="10"
                  r="8"
                  stroke="#3da5ff"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>O&M</span>
            </div>
          </div>
          {worldMapData && worldMapData.land ? (
            <svg width={width} height={height} className="globe">
              <GeoMarksUS
                data={worldMapData}
                projects={projectsLocationsData}
              />
            </svg>
          ) : (
            <pre>Loading...</pre>
          )}
        </div>
        <p className="last-updated ff-heading fw-400">
          LAST UPDATED APR 08, 2025
        </p>
      </div>
    </>
  );
}

export default App;
