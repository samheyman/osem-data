import React from "react";
import { csv } from "d3";
import csvData from "../data/projectsVesselsData.csv";

const row = (d) => {
  d.name = d["Project name"];
  d.projectID = d["Project ID"];
  d.vessels = +d.vessels;
  return d;
};
export const useVesselsData = () => {
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
