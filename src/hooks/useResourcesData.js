import React from "react";
import { csv } from "d3";
import csvData from "../data/resources.csv";

const row = (d) => {
  d.projectID = +d["ID"];
  d.activeResources = +d["active_Resources"];
  d.inactiveResources = +d["inactive_Resources"];
  d.totalResources = +d["total_Resources"];
  return d;
};
export const useResourcesData = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);
  try {
    return data.sort((a, b) => b.totalResources - a.totalResources);
  } catch (e) {
    console.error(e);
  }
};
