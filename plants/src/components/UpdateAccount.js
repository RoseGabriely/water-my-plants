import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosWithAuth from "../util";
import updateAccSchema from "../yup/updateAccSchema";

const initialUpdateValues = {
  password: "",
  phone: "",
};

const initialUpdateErrors = {
  password: "",
  phone: "",
};

const initialDisabled = true;

const UpdateAccount = () => {
  const { push } = useHistory();

  const [updateValues, setUpdateValues] = useState(initialUpdateValues);
  const [updateErrors, setUpdateErrors] = useState(initialUpdateErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //*Validation
  const validate = (name, value) => {
    yup
      .reach(updateAccSchema, name)
      .validate(value)
      .then(() => setUpdateErrors({ ...updateErrors, [name]: "" }))
      .catch((err) =>
        setUpdateErrors({ ...updateErrors, [name]: err.errors[0] })
      );
  };

  //*OnChange
  const onChange = (evt) => {
    const { name, value } = evt.target;
    validate(name, value);
    console.log(updateErrors);
    setUpdateValues({ ...updateValues, [name]: value });
  };

  //*Submit
  const onSubmit = (evt) => {
    evt.preventDefault();
    const username = localStorage.getItem("username");
    axiosWithAuth()
      .put(
        `https://watergrows.herokuapp.com/api/users/update-account/${username}`,
        updateValues
      )
      .then((res) => {
        console.log(res.data);
        push("/plants");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    updateAccSchema.isValid(updateValues).then((valid) => setDisabled(!valid));
  }, [updateValues]);

  return (
    <div className="updateAccount">
      <h2>Update Your Account</h2>
      <form onSubmit={onSubmit} className="updateAccount">
        <label>
          New Password:{" "}
          <input
            type="password"
            name="password"
            value={updateValues.password}
            onChange={onChange}
            placeholder="Enter New Password"
          />
        </label>
        <br />
        <label>
          New Phone Number:{" "}
          <input
            type="text"
            name="phone"
            value={updateValues.phone}
            onChange={onChange}
            placeholder="Enter New Phone Number"
          />
        </label>
        <br />
        <button disabled={disabled}>Save Changes</button>
      </form>
      <p style={{ color: "red" }}>{updateErrors.password}</p>
      <p style={{ color: "red" }}>{updateErrors.phone}</p>
    </div>
  );
};

export default UpdateAccount;
