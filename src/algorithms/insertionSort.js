import { getDeepCloneData } from "../util";

const insertionSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const order = [];
  let key, j;

  for (let i = 1; i < newDataset.length; i++) {
    order.push(i);
    key = newDataset[i].val;
    j = i - 1;

    while (j >= 0 && newDataset[j].val > key) {
      order.push(j);
      order.push({ do: "assign", index: j + 1, val: newDataset[j].val });

      newDataset[j + 1].val = newDataset[j].val;
      j = j - 1;
    }
    order.push({ do: "assign", index: j + 1, val: key });
    newDataset[j + 1].val = key;
  }

  return { newDataset, order };
};

export default insertionSort;
