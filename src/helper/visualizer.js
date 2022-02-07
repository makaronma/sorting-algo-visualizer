// -----------------Functions for Visualization-----------------
const visualize = (setDataSet, setInfo, orderList, count) => {
  const changeData = (newDataset) => {
    const order = orderList[count];
    const { m, n, index } = order;
    console.log(order); // For Debug

    // Change to default color first
    const prevOrder = orderList[count - 1];
    if (count > 0 && prevOrder.do !== "complete") {
      newDataset[prevOrder.m].state = "default";
      newDataset[prevOrder.n].state = "default";
    }

    if (order.accessedNewArr) {
      addNumOfArrAccessed(setInfo);
    }
    switch (order.do) {
      case "complete":
        newDataset[index].state = "done";
        break;
      case "compare":
        newDataset[m].state = "comparing";
        newDataset[n].state = "comparing";
        addNumOfComparision(setInfo);
        break;
      case "swap":
        [newDataset[m].val, newDataset[n].val] = [
          newDataset[n].val,
          newDataset[m].val,
        ];
        newDataset[m].state = "swapping";
        newDataset[n].state = "swapping";
        addNumOfSwap(setInfo);
        break;
      default:
        break;
    }

    return newDataset;
  };

  setDataSet((prevDataset) => {
    const newDataset = [...prevDataset];
    changeData(newDataset, setInfo);
    return newDataset;
  });
};
// ------------------Update Info to Display------------------
const addNumOfComparision = (setInfo) => {
  setInfo((prevInfo) => ({
    ...prevInfo,
    numOfComparison: prevInfo.numOfComparison + 1,
  }));
};
const addNumOfArrAccessed = (setInfo) => {
  setInfo((prevInfo) => ({
    ...prevInfo,
    numOfArrAccessed: prevInfo.numOfArrAccessed + 1,
  }));
};
const addNumOfSwap = (setInfo) => {
  setInfo((prevInfo) => ({
    ...prevInfo,
    numOfSwap: prevInfo.numOfSwap + 1,
  }));
};

export { visualize };
