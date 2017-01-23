const forkLogic = (gameBoard, playerToken, token) => {
  const forkLines = [
    [1, 3],
    [1, 5],
    [3, 7],
    [5, 7],
    [0, 5],
    [0, 7],
    [1, 6],
    [1, 8],
    [2, 3],
    [2, 7],
    [3, 8],
    [5, 6]
  ];

  const counterMoves = [2, 0, 6, 8, 2, 6, 0, 2, 0, 8, 6, 8];

  let playerTokenIndexes = [];

  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === playerToken) {
      playerTokenIndexes.push(i);
    }
  }
  for (let j = 0; j < forkLines.length; j++ ){
    if (forkLines[j][0] === playerTokenIndexes[0] && forkLines[j][1] === playerTokenIndexes[1]) {
      gameBoard[counterMoves[j]] = token;
    }
  }
  return gameBoard;
};

export default forkLogic;
