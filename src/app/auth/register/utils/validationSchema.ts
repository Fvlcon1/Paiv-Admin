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
		.required("Password is required.")
		.min(8, "Password must be at least 8 characters")
		.matches(/\d/, "Password must contain at least one number")
		.matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
		.matches(/[A-Z]/, "Password must contain at least one uppercase letter")
		.matches(/[a-z]/, "Password must contain at least one lowercase letter"),
});

export default validationSchema;
