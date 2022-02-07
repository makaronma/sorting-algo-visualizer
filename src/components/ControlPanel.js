import React, { useState, useRef, useEffect, useCallback } from "react";
import { getRandomInt, isObj } from "../util";
import {
  selectionSort,
  bubbleSort,
  insertionSort,
  quickSort,
} from "../algorithms";

const ControlPanel = ({ dataset, setDataSet, info, setInfo }) => {
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
  // For isSorting
  const [sortedDataset, setSortedDataset] = useState([]);

  // Set Default Value for input box
  useEffect(() => {
    dataSizeRef.current.value = 20;
    speedRef.current.value = 10;
  }, []);

  // -----------------Hooks for Animation-----------------
  // Run this in every cycle
  useEffect(() => {
    if (!isSorting) return;
    if (count >= orderList.length) {
      setSortBtnEnable(true);
      return;
    }

    const visualizerInterval = setInterval(() => {
      animate();
      setCount((prev) => prev + 1);
    }, 1000 / speedRef.current.value);

    return () => clearInterval(visualizerInterval);
  });

  // -----------------Functions for Animation-----------------
  const animate = () => {
    setDataSet((prevDataset) => {
      const newDataset = [...prevDataset];
      changeData(newDataset);
      return newDataset;
    });
  };

  const changeData = (newDataset) => {
    const order = orderList[count];
    const { m, n, index } = order;
    console.log(order); // For Debug

    // Change to default color first
    const prevOrder = orderList[count - 1];
    if (count > 0 && prevOrder.do !== "complete") {
      newDataset[prevOrder.m].state = "default";
      newDataset[prevOrder.n].state = "default";
    }

    if (order.accessedNewArr) {
      addNumOfArrAccessed();
    }
    switch (order.do) {
      case "complete":
        newDataset[index].state = "done";
        break;
      case "compare":
        newDataset[m].state = "comparing";
        newDataset[n].state = "comparing";
        addNumOfComparision();
        break;
      case "swap":
        [newDataset[m].val, newDataset[n].val] = [
          newDataset[n].val,
          newDataset[m].val,
        ];
        newDataset[m].state = "swapping";
        newDataset[n].state = "swapping";
        addNumOfSwap();
        break;
      default:
        break;
    }
  };

  // --------------------Implement Sorting--------------------
  // Get a list of orderList from isSorting result
  const sortData = () => {
    const { newDataset, newOrderList } = getSortResult();
    setOrderList(newOrderList); // to SET orderList of intructions for Animation
    setCount(0); // to RESTART Animation Counter
    setIsSorting(true); // to Disable 'Start Sort' Button
    setSortedDataset(newDataset); // to SHOW Sorted Dataset
  };

  // GET Sorting Result{ newDataset, orderlist } from algorithms
  const getSortResult = () => {
    switch (algoChoice) {
      case "selectionSort":
        return selectionSort(dataset);
      case "bubbleSort":
        return bubbleSort(dataset);
      case "insertionSort":
        return insertionSort(dataset);
      case "quickSort":
        return quickSort(dataset);
      default:
        return;
    }
  };

  // -----------------GENERATE Random Dataset-----------------
  const genRanData = (numOfData) => {
    setIsSorting(false);
    setInfo({ numOfComparison: 0, numOfArrAccessed: 0, numOfSwap: 0 });
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
      newDataset.push({
        id: i,
        val: getRandomInt(1, 1000),
        isUsing: false,
        state: "default",
      });
    }

    console.log(`Generated Dataset: `);
    console.log(newDataset);
    setDataSet(newDataset);
    setSortBtnEnable(true);
  };

  // ------------------Update Info to Display------------------
  const addNumOfComparision = () => {
    setInfo({ ...info, numOfComparison: info.numOfComparison + 1 });
  };
  const addNumOfArrAccessed = () => {
    setInfo({ ...info, numOfArrAccessed: info.numOfArrAccessed + 1 });
  };
  const addNumOfSwap = () => {
    setInfo({ ...info, numOfSwap: info.numOfSwap + 1 });
  };

  // ------------------Handle Input Area------------------
  const handleGenBtnClick = () => genRanData(dataSizeRef.current.value);
  const handleSortBtnClick = () => {
    setSortBtnEnable(false);
    sortData();
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
