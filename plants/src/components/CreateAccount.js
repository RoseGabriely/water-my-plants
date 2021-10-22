import createAccountSchema from "../yup/createAccountSchema";
import * as yup from "yup";
import React, { useState, useEffect } from "react";
import axiosWithAuth from "../util";
import { useHistory } from "react-router-dom";

const initialValues = {
  phone: "",
  username: "",
  password: "",
};

export default function CreateAccount() {
  const { push } = useHistory();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialValues);
  const [disabled, setDisabled] = useState(true);
  // ON CHANGE //
  const change = (e) => {
    const { name, value } = e.target;
    validate(name, value);
    setValues({ ...values, [name]: value });
  };
  // FORM VALIDATION //
  const validate = (name, value) => {
    yup
      .reach(createAccountSchema, name)
      .validate(value)
      .then(() => setErrors({ ...errors, [name]: "" }))
      .catch((err) => setErrors({ ...errors, [name]: err.errors[0] }));
  };
  // CREATE NEW ACCOUNT //
  const postNewAccount = (account) => {
    axiosWithAuth()
      .post("https://watergrows.herokuapp.com/api/users/register", account)
      .then((res) => {
        console.log(res.data);
        push("/sign-in");
      })
      .catch((err) =>
        setErrors({ ...errors, apiError: err.response.data.message })
      );
  };
  // ON SUBMIT //
  const submit = (e) => {
    e.preventDefault();
    const newAccount = {
      phone: values.phone,
      username: values.username,
      password: values.password,
    };
    postNewAccount(newAccount);
  };
  // ENABLE SUBMIT BUTTON
  useEffect(() => {
    createAccountSchema.isValid(values).then((valid) => setDisabled(!valid));
  }, [values]);
  return (
    <>
      <h1>Create Account</h1>
      <form id="create-account-form" onSubmit={submit}>
        <label>
          Phone Number:
          <input
            type="phone"
            name="phone"
            value={values.phone}
            onChange={change}
          ></input>
        </label>
        <label>
          Username:
          <input
            type="name"
            name="username"
            value={values.username}
            onChange={change}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={change}
          ></input>
        </label>
        <button disabled={disabled}>Create</button>
        <div className="errors">
          <div>{errors.phone}</div>
          <div>{errors.username}</div>
          <div>{errors.password}</div>
        </div>
      </form>
    </>
  );
}
