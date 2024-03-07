import React from "react";
import { csv } from "d3";
import csvData from "../data/users.csv";

const row = (d) => {
  d.projectID = +d["ID"];
  d.activeUsers = +d["active_users"];
  d.pastUsers = +d["past_users"];
  d.totalUsers = +d["total_users"];
  return d;
};
export const useUsersData = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);
  try {
    return data.sort((a, b) => b.totalUsers - a.totalUsers);
  } catch (e) {
    console.error(e);
  }
};
