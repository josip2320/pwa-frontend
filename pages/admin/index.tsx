import { Container } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import Footer from "../../components/footer";
import { NavigationBar } from "../../components/NavigationBar";
import NewsTable from "../../components/table";

const AdminPage: NextPage = () => {
  const router = useRouter();
  useLayoutEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) return;
    const user = JSON.parse(loggedInUser);

    if (user.role === "admin") return;
    router.push("/");
  }, []);

  return (
    <Container maxWidth="lg">
      <NavigationBar></NavigationBar>
      <NewsTable></NewsTable>
      <Footer></Footer>
    </Container>
  );
};

export default AdminPage;
