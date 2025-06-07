import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  firstname: Yup
    .string()
    .required("First name is required."),
  lastname: Yup
    .string()
    .required("Last name is required."),
  password: Yup
    .string()
    .required("Password is required."),
});

export default validationSchema;
