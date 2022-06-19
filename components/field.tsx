import { TextField } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

type InputFieldProps = FieldHookConfig<HTMLInputElement> & {
  name: string;
  label: string;
  fullWidth?: boolean;
  type?: string;
  minRows?: number;
  maxRows?: number;
};

export const InputField = (props: InputFieldProps) => {
  const [field, { error, touched }] = useField(props);
  return (
    <TextField
      id={props.name}
      label={props.label}
      variant="outlined"
      error={touched && !!error}
      helperText={touched && error}
      type={props.type}
      multiline={props.minRows ? true : false}
      minRows={props.minRows}
      maxRows={props.maxRows}
      {...field}
    ></TextField>
  );
};
