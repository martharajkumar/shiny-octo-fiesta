import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__content">
        <p className="footer__text">© 2024 Fiesta. All rights reserved.</p>
      </div>
       <ul className="footer__links">
      <li><a href="#" className="footer_link">About Us</a></li>
      <li><a href="#" className="footer_link">Contact</a></li>
      <li><a href="#" className="footer_link">Terms of Service</a></li>
      <li><a href="#" className="footer_link">Privacy Policy</a></li>
    </ul>
    </div>
  );
}
