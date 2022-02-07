import React, { useState, useRef, useEffect } from "react";
import { genRanData } from "../helper/dataInitializer";
import { sortData } from "../helper/sorter";
import { visualize } from "../helper/visualizer";

const ControlPanel = ({
  dataset,
  setDataSet,
  setInfo,
  setSortedDataset,
}) => {
  // --------------States--------------
  // Handle Inputs
  const dataSizeRef = useRef();
  const speedRef = useRef();
  const [algoChoice, setAlgoChoice] = useState("selectionSort");
  const [isSorting, setIsSorting] = useState(false);
  const [sortBtnEnable, setSortBtnEnable] = useState(false);
  // For animation
  const [orderList, setOrderList] = useState([]);
  const [count, setCount] = useState(0);

  // Set Default Value for input box
  useEffect(() => {
    dataSizeRef.current.value = 20;
    speedRef.current.value = 10;
  }, []);

  // -----------------Hooks for Animation-----------------
  useEffect(() => {
    if (!isSorting) return;
    if (count >= orderList.length) {
      setSortBtnEnable(true);
      return;
    }

    const visualizerInterval = setInterval(() => {
      visualize(setDataSet, setInfo, orderList, count);
      setCount((prev) => prev + 1);
    }, 1000 / speedRef.current.value);

    return () => clearInterval(visualizerInterval);
  }, [isSorting, orderList, count, setInfo, setDataSet]);

  // ------------------Handle Input Area------------------
  const handleGenBtnClick = () => {
    genRanData(dataSizeRef.current.value, setDataSet);

    setIsSorting(false);
    setInfo({ numOfComparison: 0, numOfArrAccessed: 0, numOfSwap: 0 });
    setSortBtnEnable(true);
  };
  const handleSortBtnClick = () => {
    setSortBtnEnable(false);
    sortData(setOrderList, setSortedDataset, algoChoice, dataset);
    setCount(0); // to RESTART Animation Counter
    setIsSorting(true); // to Disable 'Start Sort' Button
  };
  const handleChangeAlgoChoice = (e) => {
    setAlgoChoice(e.target.value);
  };

  // ------------------------Layout------------------------
  return (
    <div id="controlPanel">
      <div>
        <label>Data Size: </label>
        <input type="number" ref={dataSizeRef} />
        <button onClick={handleGenBtnClick}>Start Generate</button>
      </div>
      <div>
        <label>Sorting Algorithm: </label>
        <select
          name="SortAlgoSelect"
          onChange={handleChangeAlgoChoice}
          value={algoChoice}
        >
          <option value="selectionSort">Selection Sort</option>
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
          <option value="quickSort">Quick Sort</option>
        </select>
      </div>
      <div>
        <label>Speed: </label>
        <input
          className="slider"
          type="range"
          min="1"
          max="100"
          ref={speedRef}
        />
        <button onClick={handleSortBtnClick} disabled={!sortBtnEnable}>
          Start Sort
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

// TODO:
// 1: show input error message
// 2: show original data & sorted data
// 3: add stop sort btn
