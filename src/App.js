import React, { useState } from "react";
import DataDisplayBoard from "./components/DataDisplayBoard";
import ControlPanel from "./components/ControlPanel";
import "./styles/app.css";
import InfoDisplayBoard from "./components/InfoDisplayBoard";

function App() {
  const [dataset, setDataSet] = useState([]);
  const [info, setInfo] = useState({
    numOfComparison: 0,
    numOfArrAccessed: 0,
    numOfSwap: 0,
  });

  return (
    <>
      <ControlPanel
        dataset={dataset}
        setDataSet={setDataSet}
        info={info}
        setInfo={setInfo}
      />
      <InfoDisplayBoard info={info} />
      {dataset.length ? <DataDisplayBoard dataset={dataset} /> : null}
    </>
  );
}

export default App;
