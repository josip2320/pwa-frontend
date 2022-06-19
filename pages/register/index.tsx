import { Container, Box, Stack, Typography } from "@mui/material";

import { RegisterForm } from "../../components/registerForm";

function Register() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "100vh",
        }}
      >
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
            Register
          </Typography>
          <RegisterForm></RegisterForm>
        </Stack>
      </Box>
    </Container>
  );
}

export default Register;
