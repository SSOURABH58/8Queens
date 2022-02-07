// import React, { useState, useEffect } from "react";
import styles from "./dashbord.module.scss";
import { FaChessQueen } from "react-icons/fa";
import { FaBorderAll } from "react-icons/fa";
import { BsFillPlayFill } from "react-icons/bs";
import { BsPauseFill } from "react-icons/bs";

export default function Dashbord({
  isPlaying,
  size,
  playAnimaction,
  maxrange,
  curentStep,
  jumpanimaction,
  setisManval,
  isManval,
  clearBord,
  speed,
  setspeed,
  setsize,
  randomealgo,
  Boardm,
  stepsA,
  algoReset,
}) {
  // const [local, setlocal] = useState({ steps: [] });

  // const onPlayhendler = () => {
  //   updateSteps(playAlgo([], 0, size));
  // };

  const mstohhmmsss = (ms) => new Date(ms).toISOString().substr(11, 8);
  return (
    <div className={styles.dashbord}>
      <div className={styles.header}>
        <h1>{/* <FaChessQueen /> */}</h1>
        <h1>The 8 Queens Problem</h1>
        <h1>{/* <FaChessQueen /> */}</h1>
      </div>
      <div className={styles.controls}>
        <div className={styles.queensCont}>
          <div className={styles.queenBlock}>
            <FaChessQueen className={styles.queen} size={70} />
            <p>{size - Boardm.filter((tile) => tile.isQuein).length}</p>
          </div>
          <div className={styles.itrData}>
            <p className={styles.title}>Iteration left</p>
            <p>{maxrange - 1 - curentStep}</p>
            <p>
              <span className={styles.title}>Tile</span>{" "}
              {stepsA &&
                stepsA[curentStep] &&
                stepsA[curentStep ? curentStep - 1 : curentStep].block}
            </p>
            <p>
              <span className={styles.title}>Aimed by</span>{" "}
              {stepsA &&
                stepsA[curentStep] &&
                stepsA[curentStep].killers.length}
            </p>
          </div>
          <div className={styles.itrData}>
            <p className={styles.title}>Run FPS</p>
            <p>{Math.round(10000 / speed) / 10}/s</p>
            <p>
              <span className={styles.title}>Row</span>{" "}
              {stepsA &&
                stepsA[curentStep] &&
                Math.floor(stepsA[curentStep].block / size)}
            </p>
            <p>
              <span className={styles.title}>Column</span>{" "}
              {stepsA &&
                stepsA[curentStep] &&
                stepsA[curentStep].block -
                  Math.floor(stepsA[curentStep].block / size) * size}
            </p>
          </div>
          <div className={styles.social}>
            <a
              href="https://github.com/SSOURABH58/8Queens"
              className={styles.btn}
            >
              Git-hub
            </a>
            <a
              href="https://www.linkedin.com/in/sourabh58"
              className={styles.btn}
            >
              linked in
            </a>
          </div>
        </div>
        <div className={styles.genralbtns}>
          <div className={styles.selectcont}>
            <FaBorderAll size={20} />
            <select
              className={styles.selecter}
              name="bordsize"
              id="bordsize"
              value={size}
              onChange={(e) => setsize(parseInt(e.target.value))}
            >
              <option value="4">4x4</option>
              <option value="5">5x5</option>
              <option value="6">6x6</option>
              <option value="7">7x7</option>
              <option value="8">8x8</option>
              <option value="9">9x9</option>
              <option value="10">10x10</option>
              <option value="11">11x11</option>
              <option value="12">12x12</option>
              <option value="13">13x13</option>
              {/* <option value="16">16x16</option> */}
            </select>
          </div>
          <button
            className={styles.btn}
            onClick={() => {
              if (isManval) {
                clearBord();
              }
              setisManval(!isPlaying && !isManval);
            }}
          >
            {!isManval ? "Manual" : "Clear"}
          </button>
          <button className={styles.btn} onClick={() => algoReset()}>
            Algo
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              randomealgo(Math.floor(Math.random() * (size * size)));
            }}
          >
            Random
          </button>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <p>Info The 8 Queens Problem</p>
            {/* <button>b</button>
            <button>f</button> */}
          </div>
          <div className={styles.discrip}>
            The eight queens problem is the problem of placing eight queens on
            an 8×8 chessboard such that none of them attack one another.
          </div>
        </div>
        <div className={styles.playcont}>
          {/* <div className={styles.waves}>.............................</div> */}
          <div className={styles.rangetimeline}>
            <input
              type="range"
              name="range"
              id="range"
              min={0}
              max={maxrange - 1}
              value={curentStep}
              onChange={(e) => jumpanimaction(parseInt(e.target.value), true)}
            />
          </div>
          <div className={styles.timeCont}>
            <p className={styles.time}>{mstohhmmsss(curentStep * speed)}</p>
            <p className={styles.time}>
              {mstohhmmsss((maxrange - curentStep) * speed)}
            </p>
          </div>
          <div className={styles.playbtns}>
            <button
              onClick={() =>
                -1 < curentStep - 100
                  ? jumpanimaction(curentStep - 100)
                  : jumpanimaction(0)
              }
            >
              -100
            </button>
            <button
              onClick={() =>
                -1 < curentStep - 10
                  ? jumpanimaction(curentStep - 10)
                  : jumpanimaction(0)
              }
            >
              -10
            </button>
            <button
              onClick={() =>
                -1 < curentStep - 1
                  ? jumpanimaction(curentStep - 1)
                  : jumpanimaction(0)
              }
            >
              -1
            </button>
            <button className={styles.btnplay} onClick={() => playAnimaction()}>
              {isPlaying ? (
                <BsPauseFill className={styles.btnplayicon} size={30} />
              ) : (
                <BsFillPlayFill className={styles.btnplayicon} size={30} />
              )}
            </button>
            <button
              onClick={() =>
                maxrange > curentStep + 1
                  ? jumpanimaction(curentStep + 1)
                  : jumpanimaction(maxrange - 1)
              }
            >
              +1
            </button>
            <button
              onClick={() =>
                maxrange > curentStep + 10
                  ? jumpanimaction(curentStep + 10)
                  : jumpanimaction(maxrange - 1)
              }
            >
              +10
            </button>
            <button
              onClick={() =>
                maxrange > curentStep + 100
                  ? jumpanimaction(curentStep + 100)
                  : jumpanimaction(maxrange - 1)
              }
            >
              +100
            </button>
          </div>
          <div className={styles.rangespeed}>
            <span className={styles.speedvals}>speed</span>
            <input
              type="range"
              name="speed"
              id="speed"
              min={0}
              max={1499}
              value={1500 - speed}
              onChange={(e) => setspeed(1500 - e.target.value)}
            />
            <span className={styles.speedvals}>
              {Math.round((500 / speed) * 10) / 10}x
            </span>
          </div>
        </div>
        {/* <button onClick={() => onPlayhendler()}>Play</button>
        <button onClick={() => playAnimaction()}>run</button> */}
      </div>
      {/* {local.steps.map((ele) => ele + ",")} */}
      {/* {console.log(local.steps)} */}
      <footer className={styles.footer}>© Sourabh soni 2021</footer>
    </div>
  );
}
