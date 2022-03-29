import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import MapList from "./components/maplist/list";
const dataMoks = require("./moks-data.json");

const checkData = () => {
  let data = localStorage.getItem("delivery_data");
  if (!data || data.length) {
    localStorage.setItem("delivery_data", JSON.stringify(dataMoks));
    data = localStorage.getItem("delivery_data");
  }
  return JSON.parse(data) || [];
};
const mainData = checkData();
ReactDOM.render(
  <React.StrictMode>
    <MapList data={mainData}></MapList>
  </React.StrictMode>,
  document.getElementById("root")
);
