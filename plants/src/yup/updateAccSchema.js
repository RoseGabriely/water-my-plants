import * as yup from 'yup';

const updateAccSchema = yup.object().shape({
    password: yup
        .string()
        .trim()
        .required('New password is required')
        .min(6, 'Password must be at least 6 characters'),
    phoneNumber: yup
        .string()
        .required('A phone number is required')
        .min(10, 'Phone number must have 10 digits')
})

export default updateAccSchema;