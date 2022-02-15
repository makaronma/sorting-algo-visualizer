// -----------------Functions for Visualization-----------------
const visualize = (setDataSet, setInfo, orderList, count, setCount) => {
  const order = orderList[count];

  setDataSet((prevDataset) => {
    const newDataset = [...prevDataset];
    return updateData(newDataset, orderList, count);
  });
  updateInfo(order, setInfo);

  setCount((prev) => prev + 1);
};

const updateData = (newDataset, orderList, count) => {
  const order = orderList[count];
  const { m, n, index } = order;

  // Change to default color first
  const prevOrder = orderList[count - 1];
  if (count > 0 && prevOrder.do !== "complete") {
    newDataset[prevOrder.m].state = "default";
    newDataset[prevOrder.n].state = "default";
  }
  switch (order.do) {
    case "complete":
      newDataset[index].state = "done";
      break;
    case "compare":
      newDataset[m].state = "comparing";
      newDataset[n].state = "comparing";
      break;
    case "swap":
      [newDataset[m].val, newDataset[n].val] = [
        newDataset[n].val,
        newDataset[m].val,
      ];
      newDataset[m].state = "swapping";
      newDataset[n].state = "swapping";
      break;
    default:
      break;
  }
  return newDataset;
};

// ------------------Update Info to Display------------------
const updateInfo = (order, setInfo) => {
  switch (order.do) {
    case "compare":
      addNumOfComparision(setInfo);
      break;
    case "swap":
      addNumOfSwap(setInfo);
      break;
    default:
      break;
  }
};

const addNumOfComparision = (setInfo) => {
  setInfo((prevInfo) => ({
    ...prevInfo,
    numOfComparison: prevInfo.numOfComparison + 1,
  }));
};
const addNumOfSwap = (setInfo) => {
  setInfo((prevInfo) => ({
    ...prevInfo,
    numOfSwap: prevInfo.numOfSwap + 1,
  }));
};

export { visualize };
