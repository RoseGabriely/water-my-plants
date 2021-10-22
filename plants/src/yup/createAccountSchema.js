import * as yup from "yup";

const createAccountSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number required")
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),
  username: yup
    .string()
    .trim()
    .required("Username required")
    .min(3, "Username must have at least 3 characters"),
  password: yup
    .string()
    .trim()
    .required("Password required")
    .min(5, "Password must have at least 5 characters"),
});

export default createAccountSchema;
