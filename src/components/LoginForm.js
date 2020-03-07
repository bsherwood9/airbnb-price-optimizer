import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { LegitContext } from "../contexts/LegitContext";
import "../styles/LoginForm.scss";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const LoginForm = props => {
  const { id, setId, getUsers } = useContext(LegitContext);
  const [touch, setTouch] = useState({
    username: false,
    password: false
  });
  const [creds, setCreds] = useState({
    username: "",
    password: ""
  });

  const handleChange = e => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("user/login", creds)
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setId(res.data.userId);
        props.history.push("/listings");
        console.log(res);
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log(err);
      });
  };
  const goToRegister = () => {
    props.history.push("/register");
  };

  const validator = () => {
    console.log(creds);
    if (!creds.password) {
      setTouch({ ...touch, password: true });
      console.log("touch");
    } else {
      setTouch({ ...touch, password: false });
    }
  };
  const userValidator = () => {
    console.log(creds);
    if (!creds.username) {
      setTouch({ ...touch, username: true });
      console.log("touch");
    } else {
      setTouch({ ...touch, username: false });
    }
  };
  return (
    <div className="form-card">
      <form>
        <h1>Log in to Optimizer</h1>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <label htmlFor="username">username</label>
          {touch.username ? (
            <span style={{ color: "red" }}>Enter a username</span>
          ) : null}
        </div>
        <input
          name="username"
          type="text"
          onChange={handleChange}
          value={creds.username}
          onBlur={userValidator}
        ></input>
        <div style={{ display: "flex" }}>
          <label htmlFor="password">password</label>
          {touch.password ? (
            <p style={{ color: "red" }}>Enter a password</p>
          ) : null}
        </div>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={creds.password}
          onBlur={validator}
        ></input>

        <div className="btn-div">
          <button className="login" onClick={handleLogin}>
            Login
          </button>
          <button className="register" onClick={goToRegister}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
