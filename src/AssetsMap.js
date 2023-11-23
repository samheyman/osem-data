import React from "react";
import { axisBottom, axisLeft, scaleLinear, extent, color } from "d3";

const toColor = (status) => {
  if (status == null) return { fill: "white", stroke: "#666" };
  try {
    if (status.toLowerCase().indexOf("operational") > -1)
      return { fill: "#fff", stroke: "#666" };
    if (status.toLowerCase().indexOf("fault") > -1)
      return { fill: "#ffb353", stroke: "rgb(102, 60, 0)" };
    if (status.toLowerCase().indexOf("major") > -1)
      return { fill: "#ef8080", stroke: "#5f2120" };
    return { fill: "white", stroke: "#666" };
  } catch {
    return { fill: "white", stroke: "#666" };
  }
};

export const AssetsMap = ({ assetsData }) => {
  const width = 800;
  const height = 800;
  const margin = { top: 60, right: 60, bottom: 60, left: 60 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.Longitude;
  const yValue = (d) => d.Latitude;
  const status = (d) => {
    if (d.CurrentOperationalStatusName) {
      return d.CurrentOperationalStatusName;
    }
    if (d.CurrentAccessRestrictionStatusName) {
      return d.CurrentAccessRestrictionStatusName;
    }
    if (d.CurrentCustodyStatusName) {
      return d.CurrentCustodyStatusName;
    }
    if (d.CurrentPowerStatusName) {
      return d.CurrentPowerStatusName;
    }
    return null;
  };

  var xScale = scaleLinear()
    .domain(
      extent(
        assetsData.filter((asset) => asset.TypeCode === 1),
        xValue
      )
    )
    .range([innerWidth, 0]);
  var yScale = scaleLinear()
    .domain(
      extent(
        assetsData.filter((asset) => asset.TypeCode === 1),
        yValue
      )
    )
    .range([0, innerHeight]);

  return (
    <svg
      width={width}
      height={height}
      style={{ border: "1px solid grey", backgroundColor: "#d3efff" }}
    >
      <g transform={`translate(${margin.left},${margin.top})`}>
        <circle
          className="asset"
          cx={xScale(-2.869111)}
          cy={yScale(56.517157)}
          r={2}
          fill="white"
          stroke="gray"
        ></circle>
        <circle
          className="asset"
          cx={xScale(-1.498301)}
          cy={yScale(58.075832)}
          r={2}
          fill="white"
          stroke="gray"
        ></circle>
        {/* <path className="globe__graticules" d={path(graticule())} /> */}
        {assetsData
          .filter((asset) => asset.TypeCode === 1)
          .map((asset, id) => {
            // console.log(
            //   `${asset.Name}: ${xValue(asset)}, ${yValue(asset)}} (${status(
            //     asset
            //   )})`
            // );
            return (
              <circle
                className="asset"
                key={id}
                cx={xScale(xValue(asset))}
                cy={yScale(yValue(asset))}
                r={5}
                fill={
                  toColor(status(asset))
                    ? toColor(status(asset))["fill"]
                    : "white"
                }
                stroke={
                  toColor(status(asset))
                    ? toColor(status(asset))["stroke"]
                    : "white"
                }
              >
                <title>
                  {asset.Name} ({status(asset)})
                </title>
              </circle>
            );
          })}
      </g>
    </svg>
  );
};
