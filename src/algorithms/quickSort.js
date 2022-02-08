import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const quickSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const newOrderList = [];

  const partition = (arr, start, end) => {
    // Taking the last element as the pivot
    const pivotValue = arr[end].val;
    let pivotIndex = start;
    for (let i = start; i < end; i++) {
      newOrderList.push({ do: "compare", m: i, n: end });

      if (arr[i].val < pivotValue) {
        newOrderList.push({ do: "swap", m: i, n: pivotIndex });
        swap(arr[i], arr[pivotIndex]);

        // Moving to next element
        pivotIndex++;
      }
    }

    // Putting the pivot value in the middle
    newOrderList.push({ do: "swap", m: pivotIndex, n: end });
    swap(arr[pivotIndex], arr[end]);
    
    newOrderList.push({ do: "complete", index: pivotIndex });

    return pivotIndex;
  };

  const sort = (arr, start, end) => {
    // Base case or terminating case
    // newOrderList.push({ do: "compare", m: start, n: end });
    if (start >= end) {
      return;
    }

    // Returns pivotIndex
    let index = partition(arr, start, end);

    // Recursively apply the same logic to the left and right subarrays
    sort(arr, start, index - 1);
    sort(arr, index + 1, end);
    
    newOrderList.push({ do: "complete", index: end });
    newOrderList.push({ do: "complete", index: start });
  };

  sort(newDataset, 0, newDataset.length - 1);

  return { newDataset, newOrderList };
};

export default quickSort;
