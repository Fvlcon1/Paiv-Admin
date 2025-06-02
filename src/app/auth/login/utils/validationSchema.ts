import * as Yup from 'yup'

const validationSchema = Yup.object({
  email: Yup
    .string()
    .email("Invalid email address.")
    .required("Email is required."),
  // hospitalId: Yup
  //   .string()
  //   .required("Hospital Id is required."),
  password: Yup
    .string()
    .required("Password is required."),
});

export default validationSchema;
