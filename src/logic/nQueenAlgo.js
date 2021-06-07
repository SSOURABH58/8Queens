var steps = [];

const isinvincible = (queens, block, size) => {
  var killers = [];
  if (queens.length === 0) {
    steps.push({ block, isinvincible: true, killers });
    return true;
  }
  const { x, y } = getCords(block, size);
  var isQueenColide = false;
  queens.forEach((queen) => {
    const cordsQ = getCords(queen, size);
    if (
      cordsQ.x === x ||
      cordsQ.y === y ||
      cordsQ.x - cordsQ.y === x - y ||
      cordsQ.y + cordsQ.x === y + x
    ) {
      killers.push(queen);
      isQueenColide = true;
    }
  });

  steps.push({ block, isinvincible: !isQueenColide, killers });
  return !isQueenColide;
};

const getCords = (block, size) => {
  const y = Math.floor(block / size);
  const x = block - y * size;

  return { x, y };
};

const placeQueens = (Queens, y, size, PrvQueen = new Array(size).fill([])) => {
  if (PrvQueen.length <= y) PrvQueen.push([]);
  if (y > size) y = y - size;
  var queens = Queens;
  if (queens.length === size) return queens;
  else {
    for (let index = 0; index < size; index++) {
      if (
        isinvincible(queens, y * size + index, size) &&
        !PrvQueen[y].includes(y * size + index)
      ) {
        queens.push(y * size + index);
        break;
      }
      if (PrvQueen[y].includes(y * size + index)) {
        steps.pop();
        steps.push({
          block: y * size + index,
          isinvincible: false,
          killers: [],
        });
      }
    }
    // if (queens.length === y + 1)
    if (queens.length >= y + 1)
      return placeQueens(queens, y + 1, size, PrvQueen);
    else {
      PrvQueen.pop();
      console.log([...queens], [...PrvQueen], y);
      if (y > 0) {
        PrvQueen[y - 1].push(...queens.splice(y - 1, 1));
        // console.log(...queens);
        steps.push({
          block: PrvQueen[y - 1][PrvQueen[y - 1].length - 1],
          isinvincible: false,
          killers: [],
        });
      }
      if (y - 1 >= 0) return placeQueens(queens, y - 1, size, PrvQueen);
    }
  }
};

const playAlgo = (queens, y, size) => {
  steps = [];
  const Queens = placeQueens(queens, y, size);

  return { Queens, steps };
};
// console.log(placeQueens([0], 0, 8));

export { isinvincible, placeQueens, playAlgo };
