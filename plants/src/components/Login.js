import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import * as yup from "yup";
import loginSchema from "../yup/yupLoginSchema";
import { plantsStart } from "../actions";

const Login = () => {
  const initialLoginValues = {
    username: "",
    password: "",
  };
  const initialErrors = {
    apiError: "",
    username: "",
    password: "",
  };
  const { push } = useHistory();
  const [loginValues, setLoginValues] = useState(initialLoginValues);
  const [errors, setErrors] = useState(initialErrors);

  // VALIDATION //
  const validate = (name, value) => {
    yup
      .reach(loginSchema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  // ON CHANGE //
  const change = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setLoginValues({ ...loginValues, [name]: value });
  };
  // ON SUBMIT //
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("https://watergrows.herokuapp.com/api/users/login", loginValues)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", loginValues.username);
        push("/plants");
      })
      .catch((err) => {
        setErrors({ ...errors, apiError: err.response.data.message });
      });
  };

  return (
    <>
      <h1>Login</h1>
      <form id="login-form" onSubmit={submit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={loginValues.username}
            onChange={change}
            placeholder="Enter username"
          />
        </label>
        <br />
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            onChange={change}
            value={loginValues.password}
            placeholder="Enter password"
          />
        </label>
        <br />
        <button>Login</button>
        <Link to="/create-account">
          <button>Create Account</button>
        </Link>
      </form>
      <p style={{ color: "red" }}>{errors.apiError}</p>
      <p style={{ color: "red" }}>{errors.username}</p>
      <p style={{ color: "red" }}>{errors.password}</p>
    </>
  );
};

export default connect(null, { plantsStart })(Login);
