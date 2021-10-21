import * as yup from 'yup';

const createAccountSchema = yup.object().shape({
    phone: yup
        .string()
        .required('Phone required')
        .min(10, 'to short')
        .max(10, 'too long'),
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
});

export default createAccountSchema;