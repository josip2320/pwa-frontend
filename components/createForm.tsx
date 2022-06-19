import { Button, FormHelperText, Stack } from "@mui/material";
import axios from "axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { InputField } from "./field";
import { validatonSchema } from "./createSchema";

interface News {
  title: string;
  description: string;
  text: string;
  category: string;
  saveToArchive: boolean;
}

const initalValues: News = {
  title: "",
  description: "",
  text: "",
  category: "sport",
  saveToArchive: false,
};

const textArea = ({ field, form, ...props }: { field: any; form: any }) => {
  return <textarea rows={5} {...field} {...props}></textarea>;
};

const checkbox = ({ field, form, ...props }: { field: any; form: any }) => {
  return <input {...field} {...props} type="checkbox"></input>;
};

const CreateNewsForm = () => {
  const [file, setFile] = useState<File | any>(null);

  const handleSubmit = async (values: News, actions: FormikHelpers<News>) => {
    const formData = new FormData();
    formData.append("photo", file);

    const response = await axios.post("/api/news/upload/photo", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(response);

    const fileURL = response.data;
    const data = await axios.post("/api/news/upload", {
      ...values,
      fileURL,
    });
    console.log(data);
  };

  return (
    <Formik
      initialValues={initalValues}
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
  );
};

export default CreateNewsForm;
