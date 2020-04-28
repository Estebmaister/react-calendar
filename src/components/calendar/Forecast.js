import React, { useState } from "react";
import Conditions from "./Conditions.js";

export default function Forecast(props) {
  let [responseObj, setResponseObj] = useState({});
  const { city } = props;
  const uriEncodedCity = encodeURIComponent(city);
  function getForecast(event) {
    event.preventDefault();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${uriEncodedCity}&appid=beb8a90b9eb6304fecf85b2eb1ae5ff1`,
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
    <div className="forecast-div" style={{ fontSize: "0.7em" }}>
      <Conditions responseObj={responseObj} />
      <button className="forecast-button" type="button" onClick={getForecast}>
        UD WEA Forecast
      </button>
    </div>
  );
}
