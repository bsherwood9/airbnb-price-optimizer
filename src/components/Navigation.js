import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navigation.scss";
import logo from "../assets/airbnb-white.png";
import logogray from "../assets/airbnb-gray.png";

const Navigation = props => {
  const SignIn = () => {
    localStorage.getItem("token")
      ? console.log("Welcome")
      : alert("Please sign in to access Listings.");
  };

  const signOut = () => {
    localStorage.removeItem("token");
  };
  return (
    <div
      className="navbar"
      id={`${props.location.pathname !== "/" &&
        props.location.pathname !== "/register" &&
        "dark-nav"}`}
    >
      {props.location.pathname === "/" ||
      props.location.pathname === "/register" ? (
        <img id="logo" src={logo} alt="logo" />
      ) : (
        <img id="logo" src={logogray} alt="logo" />
      )}

      <nav>
        <ul>
          <li>
            <a
              target="_blank"
              href="https://hungry-pasteur-a7a528.netlify.com/"
            >
              About
            </a>
          </li>
          <li>
            <Link onClick={SignIn} to="/listings">
              Listings
            </Link>
          </li>
          <li>
            {props.location.pathname === "/" ||
            props.location.pathname === "/register" ? (
              <Link to="/">Login</Link>
            ) : (
              <Link to="/" onClick={signOut}>
                Logout
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
