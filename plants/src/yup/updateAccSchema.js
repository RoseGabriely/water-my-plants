import * as yup from "yup";

const updateAccSchema = yup.object().shape({
  password: yup.string().trim().min(6, "Password must be at least 6 characters").notRequired(),
  phoneNumber: yup.string().min(10, "Phone number must have 10 digits").notRequired()
});

export default updateAccSchema;
