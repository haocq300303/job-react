import instance from "./instance";

export const getAll = () => {
  const url = "/products";
  return instance.get(url);
};

export const getById = (id) => {
  const url = `/products/${id}`;
  return instance.get(url);
};

export const getProductByCategory = (id) => {
  const url = `/categories/${id}/products`;
  return instance.get(url);
};

export const create = (product) => {
  const url = "/products";
  return instance.post(url, product);
};

export const update = (id, product) => {
  const url = `/products/${id}`;
  return instance.put(url, product);
};

export const remove = (id) => {
  const url = `/products/${id}`;
  return instance.delete(url);
};
