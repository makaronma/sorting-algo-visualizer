import React from "react";

const Data = ({ val, numOfData }) => {
  const dataStyle = {
    width: `${100 / numOfData}%`,
    height: `${val / 10}%`,
  };

  return <div className="dataContainer" style={dataStyle}></div>;
};

export default Data;
