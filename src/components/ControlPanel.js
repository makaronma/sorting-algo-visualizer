import React, { useState, useRef } from "react";
import { getRandomInt } from "../util";

const ControlPanel = ({ dataset, setDataSet, comparison, setComparison }) => {
  const [sortBtnAble, setSortBtnAble] = useState(true);
  const genNumRef = useRef();

  // Generate button
  const handleStart = () => {
    genRanData(genNumRef.current.value);
  };

  // Generate Random Dataset
  const genRanData = (numOfData) => {
    const newDataset = [];
    for (let i = 0; i < numOfData; i++) {
      newDataset.push({ id: i, val: getRandomInt(1, 1000), isUsing: false });
    }
    setDataSet(newDataset);
  };

  // Sort button
  const handleStartSort = () => {
    setComparison(0);
    console.log("Start Sorting!");
    // setSortBtnAble(false);
    selectionSort();
  };

  // For Change Color when sorting
  const setDataContainerColor = (id) => {
    const newDataset = [...dataset];
    const data = newDataset.find((data) => data.id === id);
    data.isUsing = true;
    setDataSet(newDataset);
  };

  const selectionSort = () => {
    for (let i = 0; i < dataset.length - 1; i++) {
      let min = dataset[i].val;
      for (let j = i + 1; j < dataset.length; j++) {
        if (dataset[j].val < dataset[i].val) {
          min = dataset[j].val;
          setComparison((prev) => prev + 1);
        }
      }
      console.log(min);
    }
    setDataContainerColor(0);
  };

  return (
    <>
      <input type="number" ref={genNumRef} />
      <button onClick={handleStart}>Start Generate</button>

      <button onClick={sortBtnAble ? handleStartSort : null}>
        Start Sorting
      </button>
    </>
  );
};

export default ControlPanel;
