import { Button, FormHelperText, Stack } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import { useContext, useLayoutEffect, useState } from "react";
import useSWR from "swr";
import { AuthContext } from "./auth/AuthContext";
import { InputField } from "./field";
import { validatonSchema } from "./editSchema";

interface News {
  title: string;
  description: string;
  text: string;
  category: string;
  saveToArchive: boolean;
}

interface DataProp {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  saveToArchive: boolean;
  text: string;
  fileUrl: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const checkbox = ({ field, form, ...props }: { field: any; form: any }) => {
  return <input {...field} {...props} type="checkbox"></input>;
};

const UpdateArticleForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const user: any = useContext(AuthContext).user;
  useLayoutEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) return;
    const user = JSON.parse(loggedInUser);

    if (user.role === "admin") return;
    router.push("/");
  }, []);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const url = `/api/news/articles/${id}`;
  const { data, error }: { data?: DataProp; error?: any } = useSWR(
    id ? url : null,
    id ? fetcher : null
  );

  console.log(data?.saveToArchive);
  const initialValues: News = {
    title: data?.title ? data.title : "",
    description: data?.description ? data.description : "",
    category: data?.category ? data.category : "",
    text: data?.text ? data.text : "",
    saveToArchive: false,
  };

  const handleSubmit = async (values: News, actions: FormikHelpers<News>) => {
    axios.post(`/api/news/update/${id}`, values);
  };

  return data != null ? (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validatonSchema}
    >
      <Form>
        <Stack direction="column" spacing={2} marginY={2} sx={{ width: "50%" }}>
          <InputField name="title" label="Enter title"></InputField>
          <label>Description</label>
          <InputField
            name="description"
            label="Enter description"
            minRows={5}
          ></InputField>
          <label>Text</label>
          <InputField name="text" label="Enter text" minRows={5}></InputField>
          <input
            type="file"
            onChange={(event: any) => {
              setFile(event.target.files[0]);
            }}
          ></input>
          <Field as="select" name="category">
            <option value="sport">Sport</option>
            <option value="kultura">Kultura</option>
          </Field>
          <label>Save to archive</label>
          <Field name="saveToArchive" as={checkbox}></Field>
          <Button color="primary" type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  ) : (
    <div></div>
  );
};

export default UpdateArticleForm;
