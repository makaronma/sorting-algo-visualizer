import React from "react";
import DataContainer from "./DataContainer";
import { v4 as uuidv4 } from 'uuid';

const DataDisplayBoard = ({ dataset }) => {
  const numOfData = dataset.length;

  return (
    <div id="dataDisplayBoard">
      {dataset.map((data) => (
        <DataContainer data={data} numOfData={numOfData} key={uuidv4()}/>
      ))}
    </div>
  );
};

export default DataDisplayBoard;
