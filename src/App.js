import React, { useState, useEffect } from "react";
import { getRandomInt } from "./util";
import DataVisualizer from "./components/DataVisualizer";
import "./styles/app.css";

function App() {
  const [dataset, setDataSet] = useState([]);

  const handleStart=()=>{
    genRanData(300);
  }

  const genRanData = (numOfData) => {
    const newDataset = [];
    for (let i = 0; i < numOfData; i++) {
      newDataset.push(getRandomInt(1, 1000));
    }
    setDataSet(newDataset);
  };

  return (
    <>
      <button onClick={handleStart}>Start generate</button>
      {dataset.length && <DataVisualizer dataset={dataset} />}
    </>
  );
}

export default App;
