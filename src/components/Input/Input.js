import React from "react";
import { Link } from "react-router-dom";
const Input = ({
  h3,
  log1,
  log2,
  changeHandler,
  registerHendler,
  loginHandler,
}) => {
  return (
    <div>
      <h3>{h3}</h3>

      <div className="row">
        <form className="col s12" onSubmit={(e) => e.preventDefault()}>
          <div className="row">
            <div className="input-field col s12">
              <input
                onChange={(e) => changeHandler(e)}
                name="email"
                type="email"
                className="validate"
                placeholder="Email"
              />
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => changeHandler(e)}
                name="password"
                type="password"
                className="validate"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="  row">
            <button
              onClick={() =>
                h3 === "Увійти" ? loginHandler() : registerHendler()
              }
              className="wawes-effect wawes-light btn btn black"
            >
              {log1}
            </button>
            <Link
              to={h3 === "Увійти" ? "/registration" : "/login"}
              className="btn-outline btn-reg grey-text"
            >
              {log2}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Input;
