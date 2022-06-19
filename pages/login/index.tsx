import { Container, Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthContext } from "../../components/auth/AuthContext";
import { LoginForm } from "../../components/loginForm";

const Login = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) return;
    router.push("/");
  }, []);
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: "100vh" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          alignItems={{ md: "center" }}
          justifyContent={{ md: "space-evenly" }}
          height="100vh"
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, fontFamily: "Helvetica,sans-serif" }}
            align="center"
          >
            Login
          </Typography>
          <LoginForm></LoginForm>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;
