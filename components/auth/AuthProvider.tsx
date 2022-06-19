import React, { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { signInBackend, signoutBackend } from "./auth";
import { AuthContext } from "./AuthContext";

interface UserAuth {
  _id: string;
  username: string;
}

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserAuth | null>(null);
  useLayoutEffect(() => {}, []);

  const signIn = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    const user2 = await signInBackend(username, password);
    if (!user2) return false;
    setUser(user2);
    localStorage.setItem("user", JSON.stringify(user2));
    return true;
  };

  const signOut = async () => {
    localStorage.removeItem("user");
    setUser(null);
    signoutBackend();
  };

  const value = { user, signIn, signOut, setUser };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
