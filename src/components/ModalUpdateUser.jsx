import React, { useEffect } from "react";
import { useFormik } from "formik";
import { userUpdateSchema } from "../schema/user";
import { Button, Modal, message } from "antd";
import { updateUser } from "../api/user";

const ModalUpdateUser = ({ open, setOpen, fetchData, data }) => {
  console.log("data", data);
  const {
    handleSubmit,
    submitForm,
    handleChange,
    resetForm,
    setValues,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: userUpdateSchema,
    onSubmit: async (values) => {
      try {
        await updateUser(data.id, { ...values, password: "123456" });
        message.success("Update thành công!");
        setOpen(false);
        fetchData();
      } catch (error) {
        message.destroy("Thất bại!");
      }
    },
  });
  useEffect(() => {
    setValues({ ...data });
  }, [data, setFieldValue, setValues]);

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
            defaultValue={data.name}
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
            defaultValue={data.email}
            onChange={handleChange}
            className="p-2 border-2 border-gray-500 rounded outline-none"
            placeholder="Nhập email.."
          />
          {errors.email && touched.email && (
            <p className="text-red-500">{errors.email}</p>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
