import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const selectionSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const newOrderList = [];

  for (let i = 0; i < newDataset.length - 1; i++) {
    let min = newDataset[i].val;
    let minIndex = i;

    for (let j = i + 1; j < newDataset.length; j++) {
      newOrderList.push({ do: "compare", m: j, n: minIndex });

      if (newDataset[j].val < min) {
        min = newDataset[j].val;
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(newDataset[minIndex], newDataset[i]);
      newOrderList.push({ do: "swap", m: minIndex, n: i });
    }
    newOrderList.push({ do: "complete", index: i });
  }
  newOrderList.push({ do: "complete", index: newDataset.length - 1 });

  return { newDataset, newOrderList };
};

export default selectionSort;
