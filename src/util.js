const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const getDeepCloneData = (dataset) => {
  const newDataset = [];
  for (let i = 0; i < dataset.length; i++) {
    newDataset.push({
      id: dataset[i].id,
      val: dataset[i].val,
      isUsing: dataset[i].isUsing,
    });
  }

  return newDataset;
};

const isObj = (variable) => {
  return typeof variable === "object" && variable !== null;
};

export { getRandomInt, getDeepCloneData, isObj };
