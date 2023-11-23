import React from "react";
import { csv } from "d3";
import csvData from "../data/currentProjects.csv";

const row = (d) => {
  d.lat = +d.lat;
  d.lng = +d.lng;
  d.name = d["project name"];
  d.projectID = d["project ID"];
  d.turbines = +d.turbines;
  d.turbineCapacityMW = +d["turbine capactiy MW"];
  d.turbineCapacityCalcMW = +d.turbines * +d["turbine capactiy MW"];
  d.totalCapacityMW = +d["total capacity MW"];
  d.status = d.status;
  d.type = d.type;
  return d;
};
export const useProjectsData = () => {
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
