import { Box, Button, Stack } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { InputField } from "./field";
import { validationSchema } from "./registerSchema";
import axios from "axios";
import Router from "next/router";
import { useState } from "react";

interface Values {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
}

const initialValues: Values = {
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirm_password: "",
};

export const RegisterForm: React.FC<{}> = () => {
  const [usernameInUse, setUsernameInUse] = useState<String[]>([]);

  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>
  ) => {
    const { confirm_password, ...inputData } = values;
    try {
      const res = await axios.post("/api/user/register", inputData);
      if (!res.data.errorCode) {
        Router.push("/login");
      }
      if (res.data.errorCode != "USER_EXIST") {
        return;
      }
      setUsernameInUse((oldArray) => [...oldArray, values.username]);
      actions.setFieldError(
        "username",
        "User with that username alreay exists"
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box width={{ md: "40%", lg: "60%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema(usernameInUse)}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        <Form>
          <Stack direction="column" spacing={2}>
            <InputField
              name="username"
              label="Enter username"
              fullWidth
            ></InputField>
            <InputField
              name="firstName"
              label="Enter first name"
              fullWidth
            ></InputField>
            <InputField
              name="lastName"
              label="Enter last name"
              fullWidth
            ></InputField>
            <InputField
              name="password"
              label="Enter password"
              fullWidth
              type="password"
            ></InputField>
            <InputField
              name="confirm_password"
              label="Confirm password"
              fullWidth
              type="password"
            ></InputField>
            <Button color="primary" type="submit" variant="contained">
              Register
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};
