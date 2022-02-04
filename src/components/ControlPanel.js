import React, { useState, useRef, useEffect } from "react";
import { getRandomInt, isObj } from "../util";
import { selectionSort, bubbleSort, insertionSort } from "../algorithms";

const ControlPanel = ({ dataset, setDataSet }) => {
  // --------------States--------------
  // Define Size of Data Set in text box
  const dataSizeRef = useRef();
  const [order, setOrder] = useState();
  const [count, setCount] = useState(0);
  const [sorting, setSorting] = useState(false);
  // Buttons
  const [sortBtnEnable, setSortBtnEnable] = useState(true);

  const test = () => {};

  useEffect(() => {
    if (!sorting) return;
    if (count >= order.length) {
      setSortBtnEnable(true);
      return;
    }
    const visualizerInterval = setInterval(() => animate(), 40);

    return () => clearInterval(visualizerInterval);
  });

  // ------Handle Button Click------
  const handleGenBtnClick = () => genRanData(dataSizeRef.current.value);
  const handleSortBtnClick = () => {
    setSortBtnEnable(false);
    sortData();
  };

  // -------------Functions-------------
  const animate = () => {
    setDataSet((prevDataset) => {
      const newDataset = [...prevDataset];
      if (isObj(order[count])) {
        switch (order[count].do) {
          case "swap":
            [newDataset[order[count].m].val, newDataset[order[count].n].val] = [
              newDataset[order[count].n].val,
              newDataset[order[count].m].val,
            ];
            break;
          case "assign":
            newDataset[order[count].index].val = order[count].val;
            break;
          default:
            break;
        }
      }
      changeColor(newDataset);
      return newDataset;
    });
    setCount((prev) => prev + 1);
  };

  const sortData = () => {
    setCount(0);
    const { newDataset, order } = sort("insertionSort");
    console.log("====New===");
    console.log(order);
    console.log(newDataset);
    console.log("==========");

    // setDataSet(newDataset);

    setOrder(order);
    setSorting(true);
  };

  const changeColor = (newDataset) => {
    // Change current data to red
    if (!isObj(order[count])) {
      newDataset[order[count]].isUsing = true;
    }

    // Change prev data to black
    if (count - 1 >= 0 && !isObj(order[count - 1])) {
      newDataset[order[count - 1]].isUsing = false;
    }
  };

  // Generate Random Dataset
  const genRanData = (numOfData) => {
    setSorting(false);
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
    setSortBtnEnable(true);
  };

  // Get orders from algorithms
  const sort = (algo) => {
    let result;
    switch (algo) {
      case "selectionSort":
        result = selectionSort(dataset);
        break;
      case "bubbleSort":
        result = bubbleSort(dataset);
        break;
      case "insertionSort":
        result = insertionSort(dataset);
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
      <button onClick={handleSortBtnClick} disabled={!sortBtnEnable}>
        Start Sort
      </button>
      <button onClick={test}>test</button>
    </>
  );
};

export default ControlPanel;
