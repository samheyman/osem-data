import React from "react";
import { json, csv } from "d3";

export const useProjectsAndCompaniesData = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    json("http://localhost:3000/projectsAndCompanies.json").then((data) => {
      setData(data);
    });
  }, []);

  try {
    return data;
  } catch (e) {
    // console.error(e);
  }
};
