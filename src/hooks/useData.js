import React from "react";
import { csv } from "d3";
import csvData from "../data/data.csv";

// const csvUrl =
//   "https://gist.github.com/samheyman/0c455176c95ff0c7675592f4f7ecb761";

export const useData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const row = (d) => {
      d.Users = +d.Feb;
      return d;
    };
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
