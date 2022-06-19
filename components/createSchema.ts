import * as yup from "yup";

export const validatonSchema = () =>
  yup.object({
    title: yup
      .string()
      .min(5, "Minimal 5 characters")
      .max(20, "Maximal 20 characters")
      .required("Required"),
    description: yup
      .string()
      .min(5, "Minimal 5 characters")
      .max(100, "Maximal 100 characters")
      .required("Required"),
    text: yup.string().max(100, "Maximal 100 characters").required("Required"),
  });
