import "./App.css";
import React from "react";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useCurrentActiveUsersData } from "./hooks/useCurrentActiveUsersData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useProjectsLocationsData } from "./hooks/useProjectsLocationsData";
import { useRigsLocationsData } from "./hooks/useRigsLocationsData";
import { useAssetsData } from "./hooks/useAssetsData";
import { useHistoricalUsersData } from "./hooks/useHistoricalUsersData";
import { useWorldMapData } from "./hooks/useWorldMapData";
import { Header } from "./Header";

import { GeoMarks } from "./GeoMarks";

const width = 1800;
const height = 1000;

function App() {
  let worldMapData = useWorldMapData();
  let projectsLocationsData = useProjectsLocationsData();
  let rigsLocationData = useRigsLocationsData();
  if (!worldMapData || !projectsLocationsData) {
    return <pre>... loading ...</pre>;
  }

  return (
    <>
      <Header />

      <div className="App">
        <div className="globe__container">
          <div
            style={{
              position: "relative",
              textAlign: "left",
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
            <p style={{ fontWeight: "bold", padding: "10px 0" }}>Windfarms</p>
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
                  strokeWidth="3"
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
                  strokeWidth="3"
                  fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>O&M</span>
            </div>
            <p style={{ fontWeight: "bold", padding: "10px 0" }}>Oil rigs</p>
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
                  stroke="green"
                  strokeWidth="3"
                  // fill="none"
                />
              </svg>
              <span style={{ marginLeft: "10px" }}>O&M</span>
            </div>
          </div>
          {worldMapData && worldMapData.land ? (
            <GeoMarks
              data={worldMapData}
              projects={projectsLocationsData}
              rigs={rigsLocationData}
            />
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
