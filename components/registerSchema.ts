import * as yup from "yup";

//validation schema for form
export const validationSchema = (usernameInUse: String[]) =>
  yup.object({
    username: yup
      .string()
      .min(8, "Username must be at least 8 characters long")
      .max(30, "Username can be at most 30 characters long")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain alphanumeric characters"
      )
      .test({
        message: "User with that username already exists",
        test: async (value) => {
          if (value) {
            return !usernameInUse.includes(value);
          }
          return true;
        },
      })
      .required("Username is required"),
    firstName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "First name can only contain alphanumeric characters"
      )
      .required("First name is required"),
    lastName: yup
      .string()
      .matches(
        /^[a-zA-Z0-9_\u0100-\u017f]+$/gu,
        "Last name can only contain alphanumeric characters"
      )
      .required("Last name is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(30, "Password can be at most 30 characters long")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,30}/,
        "Password must contain at least 1 lowercase letter, 1 uppercase letter and 1 number."
      )
      .required("Password is required"),
    confirm_password: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords don't match"),
  });
