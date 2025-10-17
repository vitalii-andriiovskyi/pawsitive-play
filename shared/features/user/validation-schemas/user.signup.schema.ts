import { object, ref, string } from "yup";

const SignUpSchema = object({
  firstName: string().required("First name is required"),
  lastName: string().required("Last name is required"),
  email: string().email('Email is not valid').required("Email is required"),
  password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
  repeatPassword: string().oneOf([ref("password")], "Passwords must match"),
})

export default SignUpSchema