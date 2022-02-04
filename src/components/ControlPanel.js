import React, { useState, useRef } from "react";
import { getRandomInt } from "../util";
import selectionSort from "../algorithms/selectionSort";

const ControlPanel = ({ dataset, setDataSet }) => {
  // --------------States--------------
  // Define Size of Data Set in text box
  const dataSizeRef = useRef();

  // ------Handle Button Click------
  const handleGenBtnClick = () => genRanData(dataSizeRef.current.value);
  const handleSortBtnClick = () => {
    const { newDataset, order } = sort("selectionSort");
    console.log("====New===");
    console.log(order);
    console.log(newDataset);
    console.log("==========");
    setDataSet(newDataset)
  };

  // -------------Functions-------------
  // Generate Random Dataset
  const genRanData = (numOfData) => {
    if (numOfData <= 0) {
      console.log("Number of data must be more than 0");
      return;
    }
    if (numOfData > 1000) {
      console.log("Number of data must be less than 1000");
      return;
    }

    const newDataset = [];
    for (let i = 0; i < numOfData; i++) {
      newDataset.push({ id: i, val: getRandomInt(1, 1000), isUsing: false });
    }

    console.log(`Generated Dataset: `);
    console.log(newDataset);
    setDataSet(newDataset);
  };

  // For Change Color when sorting
  // const setDataContainerColor = (id) => {
  //   const newDataset = [...dataset];
  //   const data = newDataset.find((data) => data.id === id);
  //   data.isUsing = true;
  //   setDataSet(newDataset);
  // };

  // Get orders from algorithms
  const sort = (algo) => {
    let result;
    switch (algo) {
      case "selectionSort":
        result = selectionSort(dataset);
        break;

      default:
        break;
    }
    return result;
  };

  return (
    <>
      Data Size: <input type="number" ref={dataSizeRef} />
      <button onClick={handleGenBtnClick}>Start Generate</button>
      <button onClick={handleSortBtnClick}>Start Sort</button>
    </>
  );
};

export default ControlPanel;
