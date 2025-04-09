import React from "react";
import { csv } from "d3";
import csvData from "../data/currentRigs.csv";
import { convertToDecimal, parseCoordinate } from "../utils";

const row = (d) => {
  d.name = d.name;
  d.lat = +parseCoordinate(d.lat);
  d.lng = +parseCoordinate(d.lng);
  return d;
};
export const useRigsLocationsData = () => {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    csv(csvData, row).then((data) => {
      setData(data);
    });
  }, []);
  try {
    console.log(data);
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
