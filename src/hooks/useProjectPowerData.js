import React from "react";
import { csv } from "d3";
import csvData from "../data/currentProjects.csv";

// const csvUrl =
//   "https://gist.github.com/samheyman/0c455176c95ff0c7675592f4f7ecb761";

export const useProjectPowerData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const row = (d) => {
      d.Power = +d["mw"];
      return d;
    };
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);

  try {
    return (
      data
        // .filter((project) => (project.status === "active"))
        .sort((a, b) => b.Power - a.Power)
    );
  } catch (e) {
    // console.error(e);
  }
};
