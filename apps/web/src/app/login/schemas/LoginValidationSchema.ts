import * as Yup from "yup"

export const LoginValidationSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("password is required")
})