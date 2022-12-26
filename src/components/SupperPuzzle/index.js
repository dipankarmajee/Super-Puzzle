import { useState, useEffect } from "react";
import { FetcherWithComponents } from "react-router-dom";
import "./index.css";

const numList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let suffleNumList = numList.sort(() => Math.random() - 0.5);
let totalMoves = 0;

const SupperPuzzle = () => {
  const [stateNumList, setStateNumList] = useState(suffleNumList);

  const zeroIndex = stateNumList.indexOf(0);
  const adjacentNumers = [
    stateNumList[zeroIndex + 1],
    stateNumList[zeroIndex - 1],
    stateNumList[zeroIndex - 4],
    stateNumList[zeroIndex + 4],
  ];

  const leftColumn = [
    stateNumList[zeroIndex + 1],
    stateNumList[zeroIndex - 4],
    stateNumList[zeroIndex + 4],
  ];

  const rightColumn = [
    stateNumList[zeroIndex - 1],
    stateNumList[zeroIndex - 4],
    stateNumList[zeroIndex + 4],
  ];

  const onClickReplaceNumber = (numId) => {
    if (zeroIndex % 4 === 0) {
      console.log("zeroIndex % 4 === 0 triggered");
      if (leftColumn.includes(numId)) {
        totalMoves += 1;
        if (localStorage.getItem("totalScore") <= totalMoves) {
          localStorage.setItem("totalScore", totalMoves);
        }
        const filterNumList = stateNumList.map((eachNum) => {
          if (eachNum === 0) {
            return numId;
          } else if (eachNum === numId) {
            return 0;
          }
          return eachNum;
        });
        setStateNumList(filterNumList);
      }
    } else if ((zeroIndex + 1) % 4 === 0) {
      console.log("(zeroIndex + 1) % 4 === 0 triggered");
      if (rightColumn.includes(numId)) {
        totalMoves += 1;
        if (localStorage.getItem("totalScore") <= totalMoves) {
          localStorage.setItem("totalScore", totalMoves);
        }
        const filterNumList = stateNumList.map((eachNum) => {
          if (eachNum === 0) {
            return numId;
          } else if (eachNum === numId) {
            return 0;
          }
          return eachNum;
        });
        setStateNumList(filterNumList);
      }
    } else {
      console.log("adjacentNumber triggered");
      if (adjacentNumers.includes(numId)) {
        totalMoves += 1;
        if (localStorage.getItem("totalScore") <= totalMoves) {
          localStorage.setItem("totalScore", totalMoves);
        }
        const filterNumList = stateNumList.map((eachNum) => {
          if (eachNum === 0) {
            return numId;
          } else if (eachNum === numId) {
            return 0;
          }
          return eachNum;
        });
        setStateNumList(filterNumList);
      }
    }
  };

  const numberColor = (eachNum) => {
    if (zeroIndex % 4 === 0) {
      if (leftColumn.includes(eachNum)) {
        return "success";
      } else {
        return "danger";
      }
    } else if ((zeroIndex + 1) % 4 === 0) {
      if (rightColumn.includes(eachNum)) {
        return "success";
      } else {
        return "danger";
      }
    } else if (adjacentNumers.includes(eachNum)) {
      return "success";
    } else {
      return "danger";
    }
  };

  return (
    <div className="bg-container">
      <nav className="navbar-container">
        <div className="navbar-card">
          <p className="navbar-text">Supper Puzzle</p>
          <p className="navbar-text">Moves : {totalMoves}</p>
          <p className="navbar-text">
            Last Highest Moves :{" "}
            {localStorage.getItem("totalScore") === undefined
              ? 0
              : localStorage.getItem("totalScore")}
          </p>
        </div>
      </nav>
      <div className="name-container">
        <p className="name-text">
          Hello {localStorage.getItem("name")}! Let's play the Super Puzzle
        </p>
      </div>
      <div className="puzzle-bg-container">
        <div className="puzzle-card">
          {stateNumList.map((eachNum) => {
            if (eachNum === 0) {
              return (
                <button
                  key={eachNum}
                  className="number-tiles number-tiles-zero"
                >
                  {eachNum}
                </button>
              );
            } else {
              return (
                <button
                  key={eachNum}
                  className={`number-tiles ${numberColor(eachNum)}`}
                  onClick={() => onClickReplaceNumber(eachNum)}
                >
                  {eachNum}
                </button>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default SupperPuzzle;
