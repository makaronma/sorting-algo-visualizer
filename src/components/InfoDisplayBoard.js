import React from "react";

// To Show:
// Num of Swapping
// Num of Comparison
// Num of Arrays accessed

const InfoDisplayBoard = ({ info }) => {
  return (
    <div>
      <div>Number of Comparisons: {info.numOfComparison}</div>
      <div>Number of Swap: {info.numOfSwap}</div>
    </div>
  );
};

export default InfoDisplayBoard;
