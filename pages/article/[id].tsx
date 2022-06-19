import { Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { join } from "path";
import useSWR from "swr";
import { NavigationBar } from "../../components/NavigationBar";
import Image from "next/image";
import Footer from "../../components/footer";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
interface DataProp {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  fileUrl: string;
}
const Article: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const url = `/api/news/articles/${id}`;
  const { data, error } = useSWR(id ? url : null, id ? fetcher : null);

  return data ? (
    <Container maxWidth="lg">
      <NavigationBar></NavigationBar>
      <Stack direction="column" alignItems="center" spacing={2}>
        <Typography variant="h1">{data.title}</Typography>
        <p>{data.description}</p>
        <Image
          src={join("/api/uploads", data.fileUrl)}
          alt="Empty"
          height="300px"
          width="600px"
        ></Image>
        <p>{data.text}</p>
      </Stack>
      <Footer></Footer>
    </Container>
  ) : (
    <div></div>
  );
};

export default Article;
