import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "./auth/AuthContext";

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const [userLogedIn, setUserLogedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  useLayoutEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) return;
    setUserLogedIn(true);
    const foundUser = JSON.parse(loggedInUser);
    if (foundUser.role === "admin") setIsAdmin(true);
    auth.setUser(foundUser);
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" passHref>
            <Button color="inherit">News</Button>
          </Link>

          {userLogedIn && (
            <Link href="/create" passHref>
              <Button color="inherit">Create article</Button>
            </Link>
          )}

          {!userLogedIn && (
            <Link href="/register" passHref>
              <Button color="inherit">Register</Button>
            </Link>
          )}

          {isAdmin && (
            <Link href="/admin" passHref>
              <Button color="inherit">Admin</Button>
            </Link>
          )}
          {userLogedIn ? (
            <Button
              color="inherit"
              onClick={() => {
                auth.signOut();
                setUserLogedIn(false);
                setIsAdmin(false);
                router.push("/");
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" passHref>
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export { NavigationBar };
