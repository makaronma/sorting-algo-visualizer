import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const selectionSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const order = [];

  for (let i = 0; i < newDataset.length - 1; i++) {
    order.push(i);
    let min = newDataset[i].val;
    let minIndex = i;

    for (let j = i + 1; j < newDataset.length; j++) {
      order.push(j);
      if (newDataset[j].val < min) {
        min = newDataset[j].val;
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      swap(newDataset[minIndex], newDataset[i]);
      order.push({ do: "swap", m: minIndex, n: i });
    }
  }

  return { newDataset, order };
};

export default selectionSort;
