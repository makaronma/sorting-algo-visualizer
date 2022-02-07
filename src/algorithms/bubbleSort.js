import { getDeepCloneData } from "../util";

const swap = (m, n) => {
  [m.val, n.val] = [n.val, m.val];
};

const bubbleSort = (originDataset) => {
  let newDataset = getDeepCloneData(originDataset);
  const newOrderList = [];

  for (let i = 0; i < newDataset.length - 1; i++) {
    for (let j = 0; j < newDataset.length - i - 1; j++) {
      newOrderList.push({ do: "compare", m: j, n: j + 1 });

      if (newDataset[j].val > newDataset[j + 1].val) {
        newOrderList.push({ do: "swap", m: j, n: j + 1 });

        swap(newDataset[j], newDataset[j + 1]);
      }
    }
    newOrderList.push({ do: "complete", index: newDataset.length - i - 1 });
  }
  newOrderList.push({ do: "complete", index: 0 });

  return { newDataset, newOrderList };
};

export default bubbleSort;
