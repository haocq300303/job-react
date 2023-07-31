import instance from "./instance";

export const getAllUser = () => {
  const url = "/users";
  return instance.get(url);
};

export const getByIdUser = (id) => {
  const url = `/users/${id}`;
  return instance.get(url);
};

export const createUser = (product) => {
  const url = "/users";
  return instance.post(url, product);
};

export const updateUser = (id, product) => {
  const url = `/users/${id}`;
  return instance.put(url, product);
};

export const removeUser = (id) => {
  const url = `/users/${id}`;
  return instance.delete(url);
};

export const login = (data) => {
  const url = `/login`;
  return instance.post(url, data);
};

export const register = (data) => {
  const url = `/register`;
  return instance.post(url, data);
};
