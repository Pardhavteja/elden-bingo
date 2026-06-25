import objectivePool from "./objectivePool";

//////////////////////////////
// 🔀 Fisher-Yates Shuffle
//////////////////////////////
function shuffle(array) {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

//////////////////////////////
// 🎲 Pick Random Items
//////////////////////////////
function pickRandom(array, amount) {
  return shuffle(array).slice(0, amount);
}

//////////////////////////////
// 🎯 Generate Balanced Board
//////////////////////////////
export function generateBoard() {
  const board = [
    ...pickRandom(objectivePool.bosses, 5),
    ...pickRandom(objectivePool.exploration, 5),
    ...pickRandom(objectivePool.progression, 5),
    ...pickRandom(objectivePool.combat, 5),
    ...pickRandom(objectivePool.challenge, 5),
  ];

  return shuffle(board);
}