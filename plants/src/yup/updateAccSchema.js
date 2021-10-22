import * as yup from "yup";

const updateAccSchema = yup.object().shape(
  {
    password: yup
      .string()
      .trim()
      .when("phone", {
        is: (phone) => !phone || phone.length === 0,
        then: yup.string().min(5, "Password must be at least 5 characters"),
        otherwise: yup.string(),
      }),
    phone: yup.string().when("password", {
      is: (password) => !password || password.length === 0,
      then: yup
        .string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Phone number must be 10 digits")
        .max(10, "Phone number must be 10 digits"),
      otherwise: yup.string(),
    }),
  },
  [["password", "phone"]]
);

export default updateAccSchema;
