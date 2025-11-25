import React from "react";

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="logo">Lloyds</div>
        <h1 className="title">Mortgage Calculator</h1>
        <nav className="help">
          <a href="#help" aria-label="Help">Help</a>
        </nav>
      </div>
    </header>
  );
}
