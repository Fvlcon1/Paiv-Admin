import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  location: Yup
    .string()
    .required("Location is required."),
  hospitalName: Yup
    .string()
    .required("Hospital name is required."),
  password: Yup
    .string()
    .required("Password is required."),
});

export default validationSchema;
