import React from "react";

const stateColor = {
  default: "black",
  comparing: "red",
  swapping: "yellow",
};

const DataContainer = ({ data, numOfData }) => {
  const dataStyle = {
    width: `${100 / numOfData}%`,
    height: `${data.val / 10}%`,
    backgroundColor: stateColor[data.state],
  };

  // const usingStyle = data.isUsing ? { backgroundColor: "red" } : {};

  return <div className="dataContainer" style={dataStyle}></div>;
};

export default DataContainer;
