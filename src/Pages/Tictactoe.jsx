import { useNavigate } from "react-router-dom";
import GameBoard from "../components/tictactoe/GameBoard";
import GameOver from "../components/tictactoe/GameOver";
import Log from "../components/tictactoe/Log";
import Player from "../components/tictactoe/Player";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "../util/winning-combination";
import "../assets/css/tictactoe.css";
import { Link } from "react-router-dom";

const PLAYERNAME = {
  O: "Player 1",
  X: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// 헬퍼 함수 : 컴포넌트와 관련된 그 어떤 상태나 데이터에 접근이 필요없을때 사용하는 함수로 자동으로 재시작해줄 필요가 없다
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, playerNames) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = playerNames[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD].map((array) => {
    return [...array];
  });

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

export default function Tictactoe() {
  const [playerNames, setPlayerNames] = useState(PLAYERNAME);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, playerNames);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquere(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerNames((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main id="tic-tac-toe">
      <Link to="/">
        <div className="go-main">go main</div>
      </Link>

      <header id="header">
        <h1>tic-tac-toe</h1>
      </header>

      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERNAME.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERNAME.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquere={handleSelectSquere} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}
