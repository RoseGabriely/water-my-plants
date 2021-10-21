import createAccountSchema from '../yup/createAccountSchema';
import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialValues = {
    phone: "",
    username: "",
    password: "",
};

export default function CreateAccount() {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState(initialValues);
    const [disabled, setDisabled] = useState(true);  
    // ON CHANGE //
    const change = e => {
        const { name, value } = e.target;
        validate(name, value);
        setValues({ ...values, [name]: value });
    }
    // FORM VALIDATION //
    const validate = (name, value) => {
        yup.reach(createAccountSchema, name)
            .validate(value)
            .then(() => setErrors({ ...errors, [name]: "" }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }));
    }
    // CREATE NEW ACCOUNT //
    const postNewAccount = account => {
        axios.post("url", account)
            .then(res => {
                console.log(res.data)

                // Add new account to DB

            })
            .catch(err => console.error(err))
            .finally(() => setValues(initialValues))
    }
    // ON SUBMIT //
    const submit = e => {
        e.preventDefault()
        const newAccount = {
            phone: values.phone,
            username: values.username,
            password: values.password,
        };

        // Check if phone exists

        postNewAccount(newAccount)
    }
    // ENABLE SUBMIT BUTTON
    useEffect(() => {
        createAccountSchema.isValid(values)
            .then(valid => setDisabled(!valid))
    }, [values])
    return (
        <>
        <h1>Create Account</h1>
        <div className="errors">
            <div>{errors.firstName}</div>
            <div>{errors.lastName}</div>
            <div>{errors.phone}</div>
            <div>{errors.username}</div>
            <div>{errors.password}</div>
        </div>
        <form id="create-account-form" onSubmit={submit}>
            <label>Phone Number: 
                <input 
                    type="phone"
                    name="phone"
                    value={values.phone}
                    onChange={change}
                >
                </input>
            </label>
            <label>Username: 
                <input 
                    type="name"
                    name="username"
                    value={values.username}
                    onChange={change}
                >
                </input>
            </label>
            <label>Password: 
                <input 
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={change}
                >
                </input>
            </label>
            <button disabled={disabled}>Create</button>
        </form>
        </>
    )
}