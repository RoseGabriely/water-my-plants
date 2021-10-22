import * as yup from "yup";

const loginSchema = yup.object().shape({
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

export default loginSchema;
