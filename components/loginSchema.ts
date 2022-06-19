import * as yup from "yup";

export const loginSchema = () =>
  yup.object({
    username: yup
      .string()
      .min(8, "Username must be at least 8 characters long")
      .max(30, "Username can be at most 30 characters long")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain alphanumeric characters"
      )
      .required("Username is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password can be at most 30 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number."
      )
      .required("Password is required"),
  });
