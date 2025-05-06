import "./App.css";
import React from "react";
import { csv, arc, pie, scaleBand, scaleLinear, max, format } from "d3";
import { useCurrentActiveUsersData } from "./hooks/useCurrentActiveUsersData";
import { useProjectsData } from "./hooks/useProjectsData";
import { useProjectsLocationsData } from "./hooks/useProjectsLocationsData";
import { useRigsLocationsData } from "./hooks/useRigsLocationsData";
import { useInstallationsLocationsData } from "./hooks/useInstallationsLocationsData";
import { useAssetsData } from "./hooks/useAssetsData";
import { useHistoricalUsersData } from "./hooks/useHistoricalUsersData";
import { useWorldMapData } from "./hooks/useWorldMapData";
import { Header } from "./Header";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { GeoMarks } from "./GeoMarks";

const width = 1800;
const height = 1000;

// Create a separate component for the app content
const AppContent = () => {
  let worldMapData = useWorldMapData();
  let projectsLocationsData = useProjectsLocationsData();
  let rigsLocationData = useRigsLocationsData();
  let installationsLocationData = useInstallationsLocationsData();
  const { darkMode } = useDarkMode();

  const [visibleLayers, setVisibleLayers] = React.useState({
    construction: true,
    operations: true,
    oilRig: true,
    port: true,
    other: true,
  });

  const toggleLayer = (layer) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }));
  };

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
              top: "30px",
              left: "20px",
              backgroundColor: darkMode ? "#010d14" : "white",
              color: darkMode ? "var(--text-color)" : "black",
              padding: "5px 20px 10px 20px",
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
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => toggleLayer("construction")}
            >
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
                <span style={{ marginLeft: "10px" }}>Construction</span>
              </div>
              <input
                type="checkbox"
                checked={visibleLayers.construction}
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => toggleLayer("operations")}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg width="20" height="20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="#10a52b"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
                <span style={{ marginLeft: "10px" }}>O&M</span>
              </div>
              <input
                type="checkbox"
                checked={visibleLayers.operations}
                style={{ marginLeft: "10px" }}
              />
            </div>

            <p style={{ fontWeight: "bold", padding: "10px 0" }}>
              Installations
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => toggleLayer("oilRig")}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg width="20" height="20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="orange"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
                <span style={{ marginLeft: "10px" }}>Oil rig</span>
              </div>
              <input
                type="checkbox"
                checked={visibleLayers.oilRig}
                style={{ marginLeft: "10px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
                cursor: "pointer",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={() => toggleLayer("port")}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg width="20" height="20">
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="#e800bc"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
                <span style={{ marginLeft: "10px" }}>Port</span>
              </div>
              <input
                type="checkbox"
                checked={visibleLayers.port}
                style={{ marginLeft: "10px" }}
              />
            </div>
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "5px",
              }}
              onClick={() => toggleLayer("other")}
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
              <span style={{ marginLeft: "10px" }}>Other</span>
            </div> */}
          </div>
          {worldMapData && worldMapData.land ? (
            <GeoMarks
              data={worldMapData}
              projects={projectsLocationsData}
              rigs={rigsLocationData}
              installations={installationsLocationData}
              visibleLayers={visibleLayers}
            />
          ) : (
            <pre>Loading...</pre>
          )}
        </div>

        <p className="last-updated ff-heading fw-400">
          LAST UPDATED APR 28, 2025
        </p>
      </div>
    </>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <AuthProvider>
        <ProtectedRoute>
          <AppContent />
        </ProtectedRoute>
      </AuthProvider>
    </DarkModeProvider>
  );
}

export default App;
