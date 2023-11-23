import React from "react";
import { json, csv } from "d3";
import { Octokit } from "@octokit/core";

const ProjectKey = "04118a38-2217-40e8-bd13-30142fa3a9a1";
const IntegratorKey = "c9f93073-6694-419a-8c56-4860206bc11f";

const options = {
  method: "get",
  headers: new Headers({
    "VOM-ProjectKey": ProjectKey,
    "VOM-IntegratorKey": IntegratorKey,
  }),
};

export const useApiData = () => {
  React.useEffect(() => {
    fetch("https://oapi.offshoreenergymanager.com/odata/v1/Assets", options)
      .then((resp) => resp.json())
      .then((json) => json)
      .catch((e) => {
        console.error(e);
        return null;
      });
  }, []);
};
