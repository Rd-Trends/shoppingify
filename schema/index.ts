import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .email("please enter a valid email address")
      .required("Your email address must be provided"),
    password: yup
      .string()
      .min(6, "Password length must be greater than six")
      .required("Please enter your password"),
  })
  .required();

export const signUpSchema = yup
  .object({
    name: yup.string().required("Please enter your full name"),
    email: yup
      .string()
      .email("please enter a valid email address")
      .required("Your email address must be provided"),
    password: yup
      .string()
      .min(6, "Password length must be greater than six")
      .required("Please enter your password"),
  })
  .required();

export const itemSchema = yup.object({
  name: yup.string().required("item name must be provided"),
  note: yup.string(),
  image: yup.string().url("provide a valid image URI"),
  category: yup.string().required("item category must be selected"),
});
