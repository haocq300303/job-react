import * as Yup from "yup";

export const categorySchema = Yup.object({
  name: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(55, "Maximum 55 characters")
    .required("Required!"),
});
