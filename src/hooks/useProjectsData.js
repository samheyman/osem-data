import React from "react";
import { csv } from "d3";
import csvData from "../data/projectsData.csv";

const row = (d) => {
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.name = d["Project name"];
  d.projectID = d["Project ID"];
  d.turbines = +d.turbines;
  d.turbineCapacityMW = +d["turbine capactiy MW"];
  d.totalCapacityMW = +d["total capacity MW"];
  return d;
};
export const useProjectsData = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);
  return data;

  // try {
  //   return data.sort((a, b) => b.turbines - a.turbines);
  // } catch (e) {
  //   console.error(e);
  //   return data;
  // }
};
