import React, { useState, useRef, useEffect, useMemo } from "react";
import { genRanData } from "../helper/dataInitializer";
import { sortData } from "../helper/sorter";
import { visualize } from "../helper/visualizer";
import { getDeepCloneData } from "../util";

const ControlPanel = ({
  dataset,
  setDataSet,
  oriDataset,
  setOriDataset,
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

    const visualizerTimeout = setTimeout(() => {
      visualize(dataset, setDataSet, setInfo, orderList, count, setCount);
    }, 1000 / speedRef.current.value);

    return () => clearTimeout(visualizerTimeout);
  }, [dataset, isSorting, orderList, count, setInfo, setDataSet, oriDataset]);

  // ------------------Handle Input Area------------------
  const handleGenBtnClick = () => {
    genRanData(dataSizeRef.current.value, setDataSet, setOriDataset);

    setIsSorting(false);
    setInfo({ numOfComparison: 0, numOfArrAccessed: 0, numOfSwap: 0 });
    setSortBtnEnable(true);
  };

  const handleChangeAlgoChoice = (e) => {
    setAlgoChoice(e.target.value);
  };

  const handleSortBtnClick = () => {
    sortData(setOrderList, setSortedDataset, algoChoice, dataset);

    setSortBtnEnable(false);
    setCount(0); // to RESTART Animation Counter
    setIsSorting(true); // to Disable 'Start Sort' Button
  };

  const handleResetSortClick = () => {
    setDataSet(getDeepCloneData(oriDataset));

    setCount(0); // to RESTART Animation Counter
    setIsSorting(false); // to Disable 'Start Sort' Button
    setInfo({ numOfComparison: 0, numOfArrAccessed: 0, numOfSwap: 0 });
    setSortBtnEnable(true);
  };

  // ------------------------Layout------------------------
  return (
    <div id="controlPanel">
      <div>
        <label>Data Size: </label>
        <input type="number" ref={dataSizeRef} />
        <button onClick={handleGenBtnClick}>Generate</button>
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
          Sort
        </button>
        <button onClick={handleResetSortClick} disabled={!isSorting}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
