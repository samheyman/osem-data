import React from "react";
import { csv } from "d3";
import csvData from "../data/currentActiveUsers.csv";

// const csvUrl =
//   "https://gist.github.com/samheyman/0c455176c95ff0c7675592f4f7ecb761";

export const useCurrentActiveUsersData = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    const row = (d) => {
      d.Users = +d.active_users;
      return d;
    };
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);

  try {
    return data.sort((a, b) => b.Users - a.Users);
  } catch (e) {
    // console.error(e);
  }
};
