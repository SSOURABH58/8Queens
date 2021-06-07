import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import styles from "./board.module.scss";
import { isinvincible } from "./../../logic/nQueenAlgo.js";
import { FaChessQueen } from "react-icons/fa";

export default function Board({ size, setBoard, Board, isManval }) {
  const boardRef = useRef({});

  const [Queens, setQueens] = useState([]);

  useLayoutEffect(() => {
    boardRef.current.style.setProperty("--gridSize", size);
    setBoard(
      [...Array(size * size).keys()].map((e) => ({ index: e, isQuein: false }))
    );
  }, [boardRef, size, setBoard]);

  useEffect(() => {
    if (isManval) setQueens([]);
  }, [isManval]);

  // useEffect(() => {
  //   if (steps.length !== 0) {
  //     console.log(steps);
  //     // setBoard(
  //     //   [...Array(size * size).keys()].map((e) => ({
  //     //     index: e,
  //     //     isQuein: false,
  //     //   }))
  //     // );
  //     steps.steps.forEach((step, i) => {
  //       setTimeout(() => {
  //         setBoard((state) => {
  //           var tempBoard = state;
  //           tempBoard[step.block] = {
  //             ...tempBoard[step.block],
  //             isQuein: step.isinvincible,
  //             isVincible: !step.isinvincible,
  //           };
  //           return [...tempBoard];
  //         });

  //         setTimeout(() => {
  //           setBoard((state) => {
  //             var tempBoard = state;
  //             tempBoard[step.block] = {
  //               ...tempBoard[step.block],
  //               // isQuein: step.isinvincible,
  //               isVincible: false,
  //             };
  //             return [...tempBoard];
  //           });
  //         }, 800);
  //       }, 1 * i);
  //     });
  //   }
  // }, [steps, setBoard, size]);

  const addQueen = (ele) => {
    var tempBoard = Board;
    var tempQueens = Queens;
    if (ele.isQuein) {
      tempBoard[ele.index] = { ...tempBoard[ele.index], isQuein: !ele.isQuein };
      setQueens([...tempQueens.filter((queen) => queen !== ele.index)]);
    } else if (isinvincible(Queens, ele.index, size)) {
      setQueens([...Queens, ele.index]);
      tempBoard[ele.index] = { ...tempBoard[ele.index], isQuein: !ele.isQuein };
    }
    setBoard([...tempBoard]);
  };

  return (
    <div className={styles.board} ref={boardRef}>
      {/* {console.log(Board)} */}
      {Board.map((ele, i) => (
        <div
          key={i}
          className={`${styles.boardBlocks} ${
            size % 2 === 0
              ? (Math.floor(i / size) % 2 === 0 && i % 2 === 0) ||
                (Math.floor(i / size) % 2 !== 0 && i % 2 !== 0)
                ? styles.oddBlock
                : styles.evenBlock
              : i % 2 === 0
              ? styles.oddBlock
              : styles.evenBlock
          } ${ele.isQuein ? styles.quineBlock : ""} ${
            ele.isVincible ? styles.queenPlaceFaild : ""
          }`}
          onClick={() => {
            if (isManval) return addQueen(ele);
          }}
        >
          <div className={styles.queen}>
            <FaChessQueen size={40} />
          </div>

          <p>{ele.index}</p>
        </div>
      ))}
    </div>
  );
}
