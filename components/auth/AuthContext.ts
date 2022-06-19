import { createContext, Dispatch, SetStateAction } from "react";

interface UserAuth {
  _id: string;
  username: string;
}

interface AuthContextType {
  user: UserAuth | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
  setUser: React.Dispatch<React.SetStateAction<UserAuth | null>>;
}

const AuthContext = createContext<AuthContextType>(null!);

export { AuthContext };
