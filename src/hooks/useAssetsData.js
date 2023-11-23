import React from "react";
import { json, csv } from "d3";

export const useAssetsData = (projectName) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    console.log("Fetching project data");
    fetch(`http://localhost:3000/data/${projectName}/assets.json`)
      .then((rawData) => {
        return rawData.json();
      })
      .then((json) => {
        // console.log(json);
        setData(json);
      })
      .catch((e) => console.error(e));
  }, [, projectName]);

  try {
    console.log(data);
    return data;
  } catch (e) {
    console.error(e);
  }
};
