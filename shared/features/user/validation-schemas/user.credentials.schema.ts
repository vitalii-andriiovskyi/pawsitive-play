import { object, string } from "yup";

const CredentialsSchema = object({
  email: string().email('Email is not valid').required("Email is required"),
  password: string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

export default CredentialsSchema