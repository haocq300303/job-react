import React from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { userSchema } from "../schema/user";
import { Button, Modal, message } from "antd";
import { createUser } from "../api/user";

const ModalCreateUser = ({ open, setOpen, fetchData }) => {
  const {
    values,
    handleSubmit,
    submitForm,
    handleChange,
    resetForm,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      const { confirm_password, ...othersValue } = values;
      const formatValues = {
        ...othersValue,
        id: uuidv4(),
      };
      try {
        await createUser(formatValues);
        message.success("Thêm thành công!");
        setOpen(false);
        fetchData();
      } catch (error) {
        message.destroy("Thất bại!");
      }
    },
  });

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };
  return (
    <Modal
      title="Create"
      open={open}
      onCancel={handleCancel}
      width={600}
      style={{ top: 100 }}
      footer={[
        <Button onClick={handleCancel}>Cacel</Button>,
        <Button type="primary" onClick={submitForm}>
          Oke
        </Button>,
      ]}
    >
      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label className="font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="p-2 border-2 border-gray-500 rounded outline-none"
            placeholder="Nhập tên.."
          />
          {errors.name && touched.name && (
            <p className="text-red-500">{errors.name}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="p-2 border-2 border-gray-500 rounded outline-none"
            placeholder="Nhập email.."
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="p-2 border-2 border-gray-500 rounded outline-none"
            placeholder="Nhập password.."
          />
          {errors.password && touched.password && (
            <p className="text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Confirm Password</label>
          <input
            type="password"
            name="confirm_password"
            value={values.confirm_password}
            onChange={handleChange}
            className="p-2 border-2 border-gray-500 rounded outline-none"
            placeholder="Nhập lại password.."
          />
          {errors.confirm_password && touched.confirm_password && (
            <p className="text-red-500">{errors.confirm_password}</p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalCreateUser;
