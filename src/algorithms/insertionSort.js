import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const insertionSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const order = [];
  let key, keyIndex, j;

  for (let i = 1; i < newDataset.length; i++) {
    key = newDataset[i].val;
    keyIndex = i;
    j = i - 1;

    order.push({ do: "compare", m: j, n: keyIndex });
    while (j >= 0 && newDataset[j].val > key) {
      order.push({ do: "swap", m: j, n: j + 1 });
      swap(newDataset[j], newDataset[j + 1]);

      j = j - 1;
    }

    newDataset[j + 1].val = key;
  }

  return { newDataset, order };
};

export default insertionSort;
