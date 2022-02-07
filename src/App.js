import "./App.css";
import Board from "./comp/board/board.js";
import Dashbord from "./comp/dashbord/dashbord.js";
import React, { useState, useEffect } from "react";
import { playAlgo } from "./logic/nQueenAlgo.js";

function App() {
  const createGridArr = (size) =>
    [...Array(size * size).keys()].map((e) => ({ index: e, isQuein: false }));

  const [bordUpdates, setbordUpdates] = useState({ steps: [] });
  const [curentStep, setcurentStep] = useState(0);
  const [animactionSteps, setanimactionSteps] = useState([]);
  const [size, setsize] = useState(8);
  const [Boardm, setBoardm] = useState(createGridArr(size));
  const [isPlaying, setisPlaying] = useState(false);
  const [isManval, setisManval] = useState(false);
  const [speed, setspeed] = useState(500);

  // const [intervalId, setintervalId] = useState(0);

  // var playAnimactionInterval;
  const playAnimaction = () => {
    // console.log(curentStep, " dd");
    setisManval(false);
    if (curentStep === animactionSteps.length - 1) setcurentStep(0);
    setisPlaying(!isPlaying);
  };

  const clearBord = () => {
    setBoardm(createGridArr(size));
    // setbordUpdates({ steps: [] });
  };

  const jumpanimaction = (step, d = false) => {
    if (d) setisPlaying(false);
    setcurentStep(step);
    // console.log(step, Boardm);
    if (animactionSteps.length > step) {
      setBoardm(animactionSteps[step]);
      setTimeout(() => {
        setBoardm((bord) => {
          var tempBoard = bord;
          if (
            bordUpdates.steps.steps[step] &&
            !bordUpdates.steps.steps[step].isVincible
          )
            tempBoard[bordUpdates.steps.steps[step].block] = {
              ...tempBoard[bordUpdates.steps.steps[step].block],
              // isQuein: step.isinvincible,
              isVincible: false,
            };
          return [...tempBoard];
        });
      }, 800);
    }
  };

  // const stopplayAnimactionInterval = () => {
  //   clearInterval(playAnimactionInterval);
  // }

  const randomealgo = (queen) => {
    // console.log(queen);
    const updateSteps = (steps) => {
      // console.log(steps);
      setbordUpdates((state) => ({ ...state, steps }));
    };
    // console.log("Size:", size);
    updateSteps(playAlgo([queen], 0, size));
  };
  const algoReset = () => {
    // console.log(queen);
    const updateSteps = (steps) => {
      // console.log(steps);
      setbordUpdates((state) => ({ ...state, steps }));
    };
    // console.log("Size:", size);
    updateSteps(playAlgo([], 0, size));
  };

  useEffect(() => {
    const updateSteps = (steps) => {
      // console.log(steps);
      setbordUpdates((state) => ({ ...state, steps }));
    };
    // console.log("Size:", size);
    updateSteps(playAlgo([], 0, size));
  }, [size, setbordUpdates]);

  useEffect(() => {
    if (isPlaying) {
      const playAnimactionInterval = setInterval(() => {
        // setBoardm(animactionSteps[curentStep]);
        setcurentStep((state) => {
          if (animactionSteps.length > state && state > -1) {
            // console.log(animactionSteps[state], state);
            setBoardm(animactionSteps[state]);
            setTimeout(
              () => {
                setBoardm((bord) => {
                  var tempBoard = bord;
                  if (
                    bordUpdates.steps.steps[state] &&
                    !bordUpdates.steps.steps[state].isVincible
                  )
                    tempBoard[bordUpdates.steps.steps[state].block] = {
                      ...tempBoard[bordUpdates.steps.steps[state].block],
                      // isQuein: step.isinvincible,
                      isVincible: false,
                    };
                  return [...tempBoard];
                });
              },
              speed > 450 ? 500 : 500 - speed
            );
          } else {
            setisPlaying(false);
            return state - 1;
          }
          return state + 1;
        });
      }, speed);
      // setintervalId(playAnimactionInterval);
      return () => clearInterval(playAnimactionInterval);
    } else {
    }
  }, [isPlaying, animactionSteps, setcurentStep, bordUpdates, speed]);

  useEffect(() => {
    // console.log(curentStep);
  }, [curentStep]);
  useEffect(() => {
    if (bordUpdates.steps.length !== 0) {
      // console.log(bordUpdates.steps);
      const inibord = [...Array(size * size).keys()].map((e) => ({
        index: e,
        isQuein: false,
      }));
      var animatedsteps = [inibord];
      bordUpdates.steps.steps.forEach((step, i) => {
        var tempBoard = [...animatedsteps[i]];
        tempBoard[step.block] = {
          ...tempBoard[step.block],
          isQuein: step.isinvincible,
          isVincible: !step.isinvincible,
        };
        // console.log(step.killers.includes(0));
        tempBoard = tempBoard.map((tile) =>
          step.killers.includes(tile.index)
            ? { ...tile, isKiller: true }
            : { ...tile, isKiller: false }
        );
        animatedsteps.push(tempBoard);
      });
      console.log(animatedsteps);
      setanimactionSteps(animatedsteps);
    }
  }, [bordUpdates.steps, setanimactionSteps, size]);

  return (
    <div className="App">
      <Board
        size={size}
        isManval={isManval}
        Board={Boardm}
        setBoard={setBoardm}
        stepsA={bordUpdates.steps.steps}
        curentStep={curentStep}
      />
      <Dashbord
        size={size}
        // updateSteps={updateSteps}
        playAnimaction={playAnimaction}
        isPlaying={isPlaying}
        maxrange={animactionSteps.length}
        curentStep={curentStep}
        jumpanimaction={jumpanimaction}
        clearBord={clearBord}
        setisManval={setisManval}
        isManval={isManval}
        speed={speed}
        setspeed={setspeed}
        setsize={setsize}
        randomealgo={randomealgo}
        Boardm={Boardm}
        stepsA={bordUpdates.steps.steps}
        algoReset={algoReset}
      />
    </div>
  );
}

export default App;
