import React from "react";

const DataContainer = ({ data, numOfData }) => {
  const marginRight = 100 / numOfData / 10;
  const width = 100 / numOfData - 10 / numOfData;

  const dataStyle = {
    width: `${width}%`,
    height: `${data.val / 10}%`,
    marginRight: `${marginRight}%`,
  };

  return (
    <div className={`dataContainer ${data.state}`} style={dataStyle}></div>
  );
};

export default DataContainer;
