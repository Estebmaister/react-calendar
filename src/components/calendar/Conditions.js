import React from "react";

const Conditions = (props) => {
  return (
    <span className="span-forecast">
      {props.responseObj.cod === 200
        ? props.responseObj.weather[0].description
        : null}
    </span>
  );
};
export default Conditions;
