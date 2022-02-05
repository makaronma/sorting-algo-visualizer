import React, { useState, useRef, useEffect } from "react";
import { getRandomInt, isObj } from "../util";
import { selectionSort, bubbleSort, insertionSort } from "../algorithms";

const ControlPanel = ({ dataset, setDataSet }) => {
  // --------------States--------------
  // Define Size of Data Set in text box
  const dataSizeRef = useRef();
  const speedRef = useRef();
  const [algoChoice, setAlgoChoice] = useState("selectionSort");
  const [orders, setOrder] = useState();
  const [count, setCount] = useState(0);
  const [sorting, setSorting] = useState(false);
  const [sortBtnEnable, setSortBtnEnable] = useState(true);
  // Set Default Value of input box
  useEffect(() => {
    dataSizeRef.current.value = 20;
    speedRef.current.value = 10;
  }, []);

  // Run this in every cycle
  useEffect(() => {
    if (!sorting) return;
    if (count >= orders.length) {
      setSortBtnEnable(true);
      return;
    }
    const visualizerInterval = setInterval(
      () => animate(),
      speedRef.current.value
    );

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
      changeData(newDataset);
      return newDataset;
    });
    setCount((prev) => prev + 1);
  };

  const changeData = (newDataset) => {
    // Change to default color first
    if (count > 0) {
      const prevOrder = orders[count - 1];
      newDataset[prevOrder.m].state = "default";
      newDataset[prevOrder.n].state = "default";
    }

    const order = orders[count];
    const { m, n } = order;
    switch (order.do) {
      case "compare":
        newDataset[m].state = "comparing";
        newDataset[n].state = "comparing";
        break;
      case "swap":
        [newDataset[m].val, newDataset[n].val] = [
          newDataset[n].val,
          newDataset[m].val,
        ];
        newDataset[m].state = "swapping";
        newDataset[n].state = "swapping";
        break;
      case "assign":
        newDataset[order.index].val = order.val;
        break;
      default:
        break;
    }
  };

  const sortData = () => {
    setCount(0);
    const { newDataset, order } = getSortResult();
    console.log("====New===");
    console.log(order);
    console.log(newDataset);
    console.log("==========");

    // setDataSet(newDataset);

    setOrder(order);
    setSorting(true);
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
  const getSortResult = () => {
    let result;
    switch (algoChoice) {
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

  const handleChangeAlgoChoice = (e) => {
    setAlgoChoice(e.target.value);
  };

  return (
    <>
      Data Size: <input type="number" ref={dataSizeRef} />
      <button onClick={handleGenBtnClick}>Start Generate</button>
      {/* {<button onClick={test}>test</button>} */}
      <div>
        <label htmlFor="SortAlgoSelect">Sorting Algorithm: </label>
        <select
          name="SortAlgoSelect"
          onChange={handleChangeAlgoChoice}
          value={algoChoice}
        >
          <option value="selectionSort">Selection Sort</option>
          <option value="bubbleSort">Bubble Sort</option>
          <option value="insertionSort">Insertion Sort</option>
        </select>
      </div>
      <div>
        Speed: <input type="number" ref={speedRef} />
        <button onClick={handleSortBtnClick} disabled={!sortBtnEnable}>
          Start Sort
        </button>
      </div>
    </>
  );
};

export default ControlPanel;
