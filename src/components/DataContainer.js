import React from "react";

const DataContainer = ({ data, numOfData }) => {
  const dataStyle = {
    width: `${100 / numOfData}%`,
    height: `${data.val / 10}%`,
  };
  const usingStyle = data.isUsing ? { backgroundColor: "red" } : {};

  return (
    <div
      className="dataContainer"
      style={Object.assign(dataStyle, usingStyle)}
    ></div>
  );
};

export default DataContainer;
