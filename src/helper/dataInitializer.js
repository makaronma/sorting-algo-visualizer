import { getRandomInt, getDeepCloneData } from "../util";
// -----------------GENERATE Random Dataset-----------------
const genRanData = (numOfData, setDataSet, setOriDataset) => {
  if (numOfData <= 0) {
    console.log("Number of data must be more than 0");
    return;
  }
  if (numOfData > 1000) {
    console.log("Number of data must be less than 1000");
    return;
  }

  const newDataset = [];
  for (let i = 0; i < numOfData; i++) {
    newDataset.push({
      id: i,
      val: getRandomInt(1, 1000),
      isUsing: false,
      state: "default",
    });
  }

  setDataSet(newDataset);
  setOriDataset(getDeepCloneData(newDataset));
};

export { genRanData };
