import * as Yup from "yup";

export const productSchema = Yup.object({
  title: Yup.string()
    .min(2, "Mininum 2 characters")
    .max(55, "Maximum 55 characters")
    .required("Required!"),
  price: Yup.number().required("Required!"),
  img: Yup.string().required("Required!"),
  brand: Yup.string().required("Required!"),
  categoryId: Yup.number(),
});
