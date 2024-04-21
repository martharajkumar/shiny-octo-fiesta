import React from "react";
import { LOGO_URL } from "../utils/constants";

function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} alt="logo" height="90px" width="90px" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
