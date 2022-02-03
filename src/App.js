import React, { useState } from "react";
import DataDisplayBoard from "./components/DataDisplayBoard";
import ControlPanel from "./components/ControlPanel";
import "./styles/app.css";
import InfoDisplayBoard from "./components/InfoDisplayBoard";

function App() {
  const [dataset, setDataSet] = useState([]);
  const [comparison, setComparison] = useState(0);

  return (
    <>
      <ControlPanel
        dataset={dataset}
        setDataSet={setDataSet}
        comparison={comparison}
        setComparison={setComparison}
      />
      
      <InfoDisplayBoard comparison={comparison}/>
      {dataset.length ? <DataDisplayBoard dataset={dataset} /> : null}
    </>
  );
}

export default App;
