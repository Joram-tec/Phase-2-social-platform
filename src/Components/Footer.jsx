import React from 'react';
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        <p>Follow us on <a href="https://twitter.com/yourcompany">Twitter</a> | <a href="https://facebook.com/yourcompany">Facebook</a></p>
      </div>
    </footer>
  );
}

export default Footer;
