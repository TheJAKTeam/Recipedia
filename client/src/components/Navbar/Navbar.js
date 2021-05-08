import React from "react";
import { Link } from "react-router-dom";

import { isUserLoggedIn } from "../../util/auth";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container d-flex">
        <Link className="navbar-brand" to="/">
          Recipedia
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navToggle"
          aria-controls="navToggle"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navToggle">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            {isUserLoggedIn() && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/recipebook">
                    My Recipe Book
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/preferences">
                    Preferences
                  </Link>
                </li>
              </>
            )}

            {isUserLoggedIn() ? (
              <li className="nav-item">
                <button
                  className={`btn btn-danger btn-sm logOutButton`}
                  onClick={() => {
                    localStorage.setItem("isLoggedIn", "false");
                    window.location.reload();
                  }}
                >
                  Log Out
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Log In
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
