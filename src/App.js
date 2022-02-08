import React, { useState } from "react";
import DataDisplayBoard from "./components/DataDisplayBoard";
import ControlPanel from "./components/ControlPanel";
import "./styles/app.css";
import InfoDisplayBoard from "./components/InfoDisplayBoard";
import DataListDisplay from "./components/DataListDisplay";

function App() {
  const [dataset, setDataSet] = useState([]);
  const [sortedDataset, setSortedDataset] = useState([]);
  const [info, setInfo] = useState({
    numOfComparison: 0,
    numOfArrAccessed: 0,
    numOfSwap: 0,
  });

  return (
    <>
      <h1 id="appTitle">Sorting Algorithm Visualizer</h1>
      <div className="upperArea">
        <ControlPanel
          dataset={dataset}
          setDataSet={setDataSet}
          setSortedDataset={setSortedDataset}
          setInfo={setInfo}
        />
        <InfoDisplayBoard info={info} />
      </div>
      {dataset.length ? <DataDisplayBoard dataset={dataset} /> : null}
      <DataListDisplay dataset={dataset} sortedDataset={sortedDataset} />
    </>
  );
}

export default App;
