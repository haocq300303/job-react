import * as Yup from "yup";

export const userSchema = Yup.object({
  name: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(15, "Maximum 15 characters")
    .required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Required!"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Password's not match")
    .required("Required!"),
});

export const userUpdateSchema = Yup.object({
  name: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(25, "Maximum 15 characters")
    .required("Required!"),
  email: Yup.string().email("Invalid email format").required("Required!"),
});

export const signinSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng không được để trống"),
  password: Yup.string().min(6).required("Vui lòng không được để trống"),
});
