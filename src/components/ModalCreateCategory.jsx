import React from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { Button, Modal, message } from "antd";
import { createCategory } from "../api/category";
import { categorySchema } from "../schema/category";

const ModalCreateCategory = ({ open, setOpen, fetchData }) => {
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
    },
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      const formatValues = {
        ...values,
        id: uuidv4(),
      };
      try {
        await createCategory(formatValues);
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
      </form>
    </Modal>
  );
};

export default ModalCreateCategory;
