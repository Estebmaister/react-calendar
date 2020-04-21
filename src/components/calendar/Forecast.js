import React, { useState } from "react";
import Conditions from "./Conditions.js";

const Forecast = () => {
  let [responseObj, setResponseObj] = useState({});
  function getForecast() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=caracas&appid=beb8a90b9eb6304fecf85b2eb1ae5ff1",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResponseObj(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <p style={{ fontSize: "0.5em" }}>FindCurrentW</p>
      <div style={{ fontSize: "0.5em" }}>{JSON.stringify(responseObj)}</div>
      <Conditions responseObj={responseObj} />
      <button onClick={getForecast}>Get F</button>
    </div>
  );
};
export default Forecast;
