import ReactDOM from "react-dom/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Investment from "./Pages/Investment.jsx";
import Tictactoe from "./Pages/TictacToe.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/investment" element={<Investment />} />
      <Route path="/tictactoe" element={<Tictactoe />} />
    </Routes>
  </BrowserRouter>
);
