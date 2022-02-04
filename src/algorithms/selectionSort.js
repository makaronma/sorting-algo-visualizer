import { getDeepCloneData } from "../util";

const selectionSort = (dataset) => {
  let newDataset = getDeepCloneData(dataset);
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
      [newDataset[minIndex].val, newDataset[i].val] = [
        newDataset[i].val,
        newDataset[minIndex].val,
      ];
      order.push({ m: minIndex, n: i });
    }
  }

  return { newDataset, order };
};

export default selectionSort;
