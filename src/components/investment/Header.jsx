import React from "react";
import logo from "../../assets/investment-calculator-logo.png";

export default function Header() {
  return (
    <header id="investment-header">
      <img src={logo} alt="logo showing money bag" />
      <h1>investment caculate</h1>
    </header>
  );
}
