import React from "react";
import { csv } from "d3";
// import csvData from "../data/projectsLocations.csv";
import csvData from "../data/currentProjects.csv";

const row = (d) => {
  d.name = d.name;
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.phase = d.phase;
  d.mw = +d.mw;
  d.turbines = +d.turbines;

  return d;
};
export const useProjectsLocationsData = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);
  try {
    return data;
  } catch (e) {
    // console.error(e);
  }
  // try {
  //   return data.sort((a, b) => b.turbines - a.turbines);
  // } catch (e) {
  //   console.error(e);
  //   return data;
  // }
};
