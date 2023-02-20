const fs = require("fs");

function arrayToObj(arr = [], key) {
  const obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i][key]] = arr[i];
  }
  return obj;
}

function objToQueryParams(obj) {
  if (!obj) return "";
  let queryString = "?";

  for (const key in obj) {
    if (obj[key] !== undefined) {
      if (queryString !== "?") queryString += "&";
      queryString += `${key}=${obj[key]}`;
    }
  }

  return queryString;
}

function queryParamsToObj(queryParams = "") {
  if (queryParams === "") return {};

  queryParams = queryParams.substring(1);

  const params = queryParams.split("&");
  const obj = {};
  params.forEach((param) => {
    const [key, value] = param.split("=");
    if (value !== undefined) {
      obj[key] = value;
    }
  });

  return obj;
}

function uniqueValues(value, index, self) {
  return self.indexOf(value) === index;
}

const file = (path) => fs.readFileSync(path, { encoding: "utf-8" });

module.exports = {
  objToQueryParams,
  queryParamsToObj,
  arrayToObj,
  file,
  uniqueValues,
};
