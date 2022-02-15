import React from "react";
import DataContainer from "./DataContainer";

const DataDisplayBoard = ({ dataset }) => {
  const numOfData = dataset.length;

  return (
    <div id="dataDisplayBoard">
      {dataset.map((data,index) => (
        <DataContainer data={data} numOfData={numOfData} key={`data-${index}`}/>
      ))}
    </div>
  );
};

export default DataDisplayBoard;
