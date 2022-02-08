import React from "react";
import { v4 as uuidv4 } from "uuid";

const DataListDisplay = ({ dataset, sortedDataset }) => {
  return (
    <div className="dataValList">
      <div>
        <h3>Current Dataset</h3>
        {dataset.map((data) => (
          <div key={uuidv4()}>{data.val}</div>
          ))}
      </div>
      <div>
          <h3>Sorted Dataset</h3>
        {sortedDataset.map((data) => (
          <div key={uuidv4()}>{data.val}</div>
        ))}
      </div>
    </div>
  );
};
export default DataListDisplay;
