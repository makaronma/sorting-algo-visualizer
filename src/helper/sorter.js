import {
  selectionSort,
  bubbleSort,
  insertionSort,
  quickSort,
} from "../algorithms";

// --------------------Implement Sorting--------------------
// Get a list of orderList from isSorting result
const sortData = (setOrderList, setSortedDataset, algoChoice, dataset) => {
  dataset.forEach((data) => {
    data.state = "default";
  });
  const { newDataset, newOrderList } = getSortResult(algoChoice, dataset);
  setOrderList(newOrderList); // to SET orderList of intructions for Animation
  setSortedDataset(newDataset); // to SHOW Sorted Dataset
};

// GET Sorting Result{ newDataset, orderlist } from algorithms
const getSortResult = (algoChoice, dataset) => {
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

export { sortData };
