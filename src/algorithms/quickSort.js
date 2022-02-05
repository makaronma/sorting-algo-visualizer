import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const quickSort = (originDataset) => {
  console.log("====Quick Sort====");
  let newDataset = getDeepCloneData(originDataset);
  const order = [];

  const partition = (arr, start, end) => {
    // Taking the last element as the pivot
    const pivotValue = arr[end].val;
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      order.push({ do: "compare", m: i, n: end });

      if (arr[i].val < pivotValue) {
        order.push({ do: "swap", m: i, n: pivotIndex });
        swap(arr[i], arr[pivotIndex]);

        // Moving to next element
        pivotIndex++;
      }
    }

    // Putting the pivot value in the middle
    order.push({ do: "swap", m: pivotIndex, n: end });
    swap(arr[pivotIndex], arr[end]);
    return pivotIndex;
  };

  const sort = (arr, start, end) => {
    // Base case or terminating case
    // order.push({ do: "compare", m: start, n: end });
    if (start >= end) {
      return;
    }

    // Returns pivotIndex
    let index = partition(arr, start, end);

    // Recursively apply the same logic to the left and right subarrays
    sort(arr, start, index - 1);
    sort(arr, index + 1, end);
  };

  sort(newDataset, 0, newDataset.length - 1);

  return { newDataset, order };
};

export default quickSort;
