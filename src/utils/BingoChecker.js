const WINNING_LINES = [
  // Rows
  [0,1,2,3,4],
  [5,6,7,8,9],
  [10,11,12,13,14],
  [15,16,17,18,19],
  [20,21,22,23,24],

  // Columns
  [0,5,10,15,20],
  [1,6,11,16,21],
  [2,7,12,17,22],
  [3,8,13,18,23],
  [4,9,14,19,24],

  // Diagonals
  [0,6,12,18,24],
  [4,8,12,16,20],
];

export function checkWinner(claimedBy) {

  // Win by Bingo
  for (const line of WINNING_LINES) {

    const first = claimedBy[line[0]];

    if (first === 0) continue;

    if (line.every(index => claimedBy[index] === first)) {
      return {
        winner: first,
        reason: "BINGO",
      };
    }
  }

  // Win by Majority (13 tiles)
  const player1 = claimedBy.filter(x => x === 1).length;
  const player2 = claimedBy.filter(x => x === 2).length;

  if (player1 >= 13) {
    return {
      winner: 1,
      reason: "MAJORITY",
    };
  }

  if (player2 >= 13) {
    return {
      winner: 2,
      reason: "MAJORITY",
    };
  }

  return {
    winner: 0,
    reason: null,
  };
}

export { WINNING_LINES };