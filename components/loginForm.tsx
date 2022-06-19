import { Alert, Box, Button, Stack } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import { useContext, useState } from "react";
import { InputField } from "./field";
import { loginSchema } from "./loginSchema";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import { AuthContext } from "./auth/AuthContext";

interface Values {
  username: string;
  password: string;
}

const intialValues: Values = {
  username: "",
  password: "",
};

export const LoginForm = () => {
  const [loginIncorrect, setLoginIncorrect] = useState(false);
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const handleSubmit = async (
    values: Values,
    actions: FormikHelpers<Values>
  ) => {
    const res = await authContext.signIn(values.username, values.password);
    if (res) return router.push("/");
    return setLoginIncorrect(true);
  };
  return (
    <Box width={{ md: "40%", lg: "60%" }}>
      <Formik
        initialValues={intialValues}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
        validationSchema={loginSchema}
      >
        <Form>
          <Stack direction="column" spacing={2}>
            {loginIncorrect && (
              <Alert severity="error">Incorrect username or password</Alert>
            )}
            <InputField
              name="username"
              label="Enter username"
              fullWidth
            ></InputField>
            <InputField
              name="password"
              label="Enter password"
              fullWidth
              type="password"
            ></InputField>
            <Button color="primary" type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </Form>
      </Formik>
    </Box>
  );
};
