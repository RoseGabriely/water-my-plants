// create a form to update passwords and phone numbers, save data to state
// Dani
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axiosWithAuth from "../util";
import schema from "../yup/updateAccSchema";

const initialUpdateValues = {
  password: "",
  phoneNumber: "",
};

const initialUpdateErrors = {
  password: "",
  phoneNumber: "",
};

const initialDisabled = true;

const UpdateAccount = () => {
  const [updateValues, setUpdateValues] = useState(initialUpdateValues);
  const [updateErrors, setUpdateErrors] = useState(initialUpdateErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  //*Validation
  const validate = (name, value) => {
    yup
      .reach(schema, name)
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
    setUpdateValues({ ...updateValues, [name]: value });
  };

  //*Submit
  const onSubmit = (evt) => {
    evt.preventDefault();
    const UpdatedInfo = {
      password: updateValues.password,
      phoneNumber: updateValues.phoneNumber,
    };
    validate(UpdatedInfo);
    // axiosWithAuth()
    //   .put(
    //     `https://watergrows.herokuapp.com/api/users/update-account/:username`,
    //     UpdatedInfo
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //   }).catch(err => {
    //     console.log(err.response)
    //   })
  };

  useEffect(() => {
    schema.isValid(updateValues).then((valid) => setDisabled(!valid));
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
            type="tel"
            name="phoneNumber"
            value={updateValues.phoneNumber}
            onChange={onChange}
            placeholder="Enter New Phone Number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          />
        </label>
        <br />
        <button disabled={disabled}>Save Changes</button>
      </form>
      <p style={{ color: "red" }}>{updateErrors.password}</p>
      <p style={{ color: "red" }}>{updateErrors.phoneNumber}</p>
    </div>
  );
};

export default UpdateAccount;
