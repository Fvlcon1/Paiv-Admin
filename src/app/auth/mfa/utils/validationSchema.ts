import * as Yup from 'yup'

const validationSchema = Yup.object({
    v1: Yup
        .number()
        .required("v1 Id is required."),
    v2: Yup
        .number()
        .required("v2 Id is required."),
    v3: Yup
        .number()
        .required("v3 Id is required."),
    v4: Yup
        .number()
        .required("v4 Id is required."),
    v5: Yup
        .number()
        .required("v5 Id is required."),
    v6: Yup
        .number()
        .required("v6 Id is required."),
});

export default validationSchema;
