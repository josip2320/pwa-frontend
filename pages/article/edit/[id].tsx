import { Container } from "@mui/material";
import { NextPage } from "next";
import { NavigationBar } from "../../../components/NavigationBar";
import UpdateArticleForm from "../../../components/editForm";
import Footer from "../../../components/footer";

const EditPage: NextPage = () => {
  return (
    <Container maxWidth="lg">
      <NavigationBar></NavigationBar>
      <UpdateArticleForm></UpdateArticleForm>
      <Footer></Footer>
    </Container>
  );
};

export default EditPage;
