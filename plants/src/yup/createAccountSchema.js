import * as yup from 'yup';

const createAccountSchema = yup.object().shape({
    firstName: yup
        .string()
        .trim()
        .min(3, 'First name must have at least 3 characters')
        .required('First name required'),
    lastName: yup
        .string()
        .trim()
        .min(3, 'Last name must have at least 3 characters')
        .required('Last name required'),
    email: yup
        .string()
        .email('Must be a valid email')
        .required('Email required'),
    username: yup
        .string()
        .trim()
        .min(3, 'Username must have at least 3 characters')
        .required('Username required'),
    password: yup
        .string()
        .trim()
        .min(6, 'Password must have at least 6 characters')
        .required('Password required')
        .matches(/[a-z]/, 'at least one lowercase letter')
        .matches(/[A-Z]/, 'at least one uppercase letter')
        .matches(/[a-zA-Z]+[^a-zA-z\s]+/, 'at least 1 number or special character')
});

export default createAccountSchema;