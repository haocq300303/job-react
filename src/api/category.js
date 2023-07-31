import instance from "./instance";

export const getAllCategory = () => {
  const url = "/categories";
  return instance.get(url);
};

export const getByIdCategory = (id) => {
  const url = `/categories/${id}`;
  return instance.get(url);
};

export const createCategory = (product) => {
  const url = "/categories";
  return instance.post(url, product);
};

export const updateCategory = (id, product) => {
  const url = `/categories/${id}`;
  return instance.put(url, product);
};

export const removeCategory = (id) => {
  const url = `/categories/${id}`;
  return instance.delete(url);
};
