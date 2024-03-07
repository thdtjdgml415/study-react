import React, { useState } from "react";
import "../assets/css/investment.css";
import Header from "../components/investment/Header";
import UserInput from "../components/investment/UserInput";
import Results from "../components/investment/Results";
import { Link } from "react-router-dom";

export default function Investment() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const invaildInput = userInput.duration <= 0 ? false : true;

  function handleChange(inputIdentifier, newValue) {
    console.log("handleChange", inputIdentifier, newValue);
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [inputIdentifier]: +newValue,
      };
    });
  }
  return (
    <main id="investment">
      <Link to="/">
        <div className="go-main">go main</div>
      </Link>

      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />

      {invaildInput ? (
        <Results input={userInput} />
      ) : (
        <p className="center">기간이 0보다 커야합니다.</p>
      )}
    </main>
  );
}
