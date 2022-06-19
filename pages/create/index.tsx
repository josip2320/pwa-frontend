import { Container } from "@mui/system";
import { NavigationBar } from "../../components/NavigationBar";
import CreateNewsForm from "../../components/createForm";
import Footer from "../../components/footer";

const CreateNews = () => {
  return (
    <Container maxWidth="lg">
      <NavigationBar></NavigationBar>
      <CreateNewsForm></CreateNewsForm>
      <Footer />
    </Container>
  );
};
export default CreateNews;
