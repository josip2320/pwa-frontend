import axios from "axios";

interface UserAuth {
  _id: string;
  username: string;
  role: string;
}

async function signInBackend(
  username: string,
  password: string
): Promise<UserAuth | null> {
  try {
    const res = await axios.post(
      "/api/auth/login",
      { username: username, password: password },
      { withCredentials: true }
    );
    if (res.data) return res.data;
  } catch (err) {
    return null;
  }
  return null;
}

const signoutBackend = async () => {
  axios.get("/api/auth/logout");
};
export { signInBackend, signoutBackend };
