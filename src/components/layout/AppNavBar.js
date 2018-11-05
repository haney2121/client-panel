import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class AppNavBar extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
          <div className="container">
            <Link to="/" className="navbar-brand">
              Client Panel
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarMain"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </Fragment>
    );
  }
}

export default AppNavBar;
