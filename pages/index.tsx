import { Grid, Link, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import type { NextPage } from "next";
import useSWR from "swr";
import { string } from "yup";
import Image from "next/image";
import { NavigationBar } from "../components/NavigationBar";
import { join } from "path";
import Footer from "../components/footer";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);
interface DataProp {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  saveToArchive: boolean;
  fileUrl: string;
}

interface Props {
  children: React.ReactNode;
}

const Home: NextPage = () => {
  const { data, error }: { data?: DataProp[]; error?: any } = useSWR(
    "/api/news/all",
    fetcher
  );
  console.log(data);
  const newData = data?.filter((article) => {
    return article.saveToArchive;
  });

  const sports = newData?.filter((value) => {
    return value.category === "sport";
  });

  const kultura = newData?.filter((value) => {
    return value.category === "kultura";
  });

  return (
    <Container maxWidth="lg">
      <NavigationBar></NavigationBar>
      <Typography variant="h2">Sport</Typography>
      <Grid container spacing={2}>
        {sports?.map((article) => {
          return (
            <Grid item xs={12} md={4} key={article.id}>
              <Stack direction="column">
                <Link href={`article/${article.id}`}>
                  <Image
                    src={join("/api/uploads", article.fileUrl)}
                    width={400}
                    height={200}
                    alt="Empty"
                  ></Image>
                </Link>

                <Typography variant="h3">{article.title}</Typography>
                <p>{article.description}</p>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
      <Typography variant="h2">Kultura</Typography>
      <Grid container spacing={2}>
        {kultura?.map((article) => {
          return (
            <Grid item xs={4} md={4} key={article.id}>
              <Stack direction="column">
                <Link href={`article/${article.id}`}>
                  <Image
                    src={join("/api/uploads", article.fileUrl)}
                    width={400}
                    height={200}
                    alt="Empty"
                  ></Image>
                </Link>
                <Typography variant="h3">{article.title}</Typography>
                <p>{article.description}</p>
              </Stack>
            </Grid>
          );
        })}
      </Grid>
      <Footer></Footer>
    </Container>
  );
};

export default Home;
