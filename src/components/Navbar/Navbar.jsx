import React from "react";

const Navbar = ({ logout, isLogin }) => {
  console.log("NAVBAR " + isLogin);
  return (
    <nav>
      <div className="nav-wrapper navbar grey">
        <a href="/" className="brand-logo">
          ICD TODOS
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            {isLogin ? (
              <a onClick={() => logout()} href="/">
                Вийти
              </a>
            ) : (
              <a href="/">Увійти</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
