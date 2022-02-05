import React from "react";

// To Show:
// Num of Swapping
// Num of Comparison
// Num of Arrays accessed

const InfoDisplayBoard = ({ info }) => {
  return (
    <div id="InfoDisplayBoard">
      <div>Comparisons: {info.numOfComparison}</div>
      <div>Swaps: {info.numOfSwap}</div>
    </div>
  );
};

export default InfoDisplayBoard;
