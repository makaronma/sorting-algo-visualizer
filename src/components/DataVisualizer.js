import React from "react";
import Data from "./Data";
import { v4 as uuidv4 } from 'uuid';

const DataVisualizer = ({ dataset }) => {
  const numOfData = dataset.length;

  return (
    <div id="displayBoard">
      {dataset.map((val) => (
        <Data val={val} numOfData={numOfData} key={uuidv4()}/>
      ))}
    </div>
  );
};

export default DataVisualizer;
