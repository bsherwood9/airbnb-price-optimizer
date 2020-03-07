import React, { useState, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import "../styles/LoginForm.scss";

const RegisterForm = props => {
  const [userCreds, setUserCreds] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    email: ""
  });

  const [confirm, setConfirm] = useState(false);

  const handleChange = e => {
    setUserCreds({ ...userCreds, [e.target.name]: e.target.value });
  };

  const register = e => {
    e.preventDefault();
    console.log("user creds", userCreds);
    axiosWithAuth()
      .post("user/register", userCreds)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        console.log(res);
        if (res.statusText === "Created") {
          setConfirm(
            <h4 style={{ color: "lightgreen", marginTop: "-20px" }}>
              Thanks for registering.
            </h4>
          );
        } else {
          setConfirm(null);
        }
      })
      .catch(err => {
        localStorage.removeItem("token");
        if (err.message) {
          setConfirm(
            <h4 style={{ color: "red", marginTop: "-20px" }}>
              Please fill out all fields.
            </h4>
          );
          console.log(err);
        }
      });
  };

  const login = e => {
    e.preventDefault();
    props.history.push("/");
  };

  return (
    <div className="form-card regstyle">
      <form>
        <h1>Register</h1>
        {confirm}
        <label htmlFor="firstname">first name</label>
        <input
          required
          name="firstname"
          type="text"
          onChange={handleChange}
          value={userCreds.firstname}
        ></input>
        <label htmlFor="lastname">last name</label>
        <input
          required
          name="lastname"
          type="text"
          onChange={handleChange}
          value={userCreds.lastname}
        ></input>
        <label htmlFor="username">username</label>
        <input
          required
          name="username"
          type="text"
          onChange={handleChange}
          value={userCreds.username}
        ></input>
        <label htmlFor="password">password</label>
        <input
          required
          name="password"
          type="password"
          onChange={handleChange}
          value={userCreds.password}
        ></input>
        <label htmlFor="confirm">email</label>
        <input
          required
          name="email"
          type="email"
          onChange={handleChange}
          value={userCreds.confirm}
        ></input>
        <div className="btn-div">
          <button className="submit" onClick={register}>
            Submit
          </button>
          <button className="login2" onClick={login}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
