import { Link } from "react-router-dom";

function App() {
  return (
    <div>
      <h1>사이트 바로가기</h1>
      <ol>
        <Link to="/tictactoe">
          <li>틱택토 게임</li>
        </Link>
        <Link to="investment">
          <li>투자 계산기</li>
        </Link>
      </ol>
    </div>
  );
}

export default App;
