import React from "react";
import { csv } from "d3";
import csvData from "../data/projectUsersData.csv";

// const csvUrl =
//   "https://gist.github.com/samheyman/0c455176c95ff0c7675592f4f7ecb761";

export const useProjectUserData = (date) => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const row = (d) => {
      d.Users = +d[date];
      return d;
    };
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, [, date]);

  try {
    return data
      .filter((project) => project.status === "active")
      .sort((a, b) => b.Users - a.Users);
  } catch (e) {
    console.error(e);
    return data;
  }
};
