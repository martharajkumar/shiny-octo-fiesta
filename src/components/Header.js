import React from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={LOGO_URL} alt="logo" height="90px" width="90px" />
      </div>
      <div className="nav-items">
        <Link className="nav-item-link" to="/">
          Home
        </Link>
        <Link className="nav-item-link" to="/cart">
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Header;
