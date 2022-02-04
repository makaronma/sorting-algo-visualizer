import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const bubbleSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const order = [];

  for (let i = 0; i < newDataset.length - 1; i++) {
    order.push(i);
    for (let j = 0; j < newDataset.length - i - 1; j++) {
      order.push(j);
      if (newDataset[j].val > newDataset[j + 1].val) {
        order.push({ do: "swap", m: j, n: j + 1 });
        swap(newDataset[j], newDataset[j + 1]);
      }
    }
  }
  return { newDataset, order };
};

export default bubbleSort;
