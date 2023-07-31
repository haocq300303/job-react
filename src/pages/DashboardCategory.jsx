import { Button, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getAllCategory, removeCategory } from "../api/category";
import ModalCreateCategory from "../components/ModalCreateCategory";
import ModalUpdateCategory from "../components/ModalUpdateCategory";

const DashboardCategory = () => {
  const [dateTable, setDataTable] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [dataUpdate, setDataUpdate] = useState();
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      render: (data) => {
        return (
          <div className="flex gap-3">
            <Button
              type="primary"
              onClick={() => {
                setDataUpdate(data);
                setOpenModalUpdate(true);
              }}
            >
              Edit
            </Button>
            <Button
              type="default"
              className="bg-red-500 text-white"
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const fetchData = async () => {
    try {
      const res = await getAllCategory();
      const formatData = res.data.map((item, index) => {
        return {
          key: index,
          id: item.id,
          name: item.name,
        };
      });
      setDataTable(formatData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Delete",
      icon: <ExclamationCircleFilled />,
      content: "Bạn có chắc chắn muốn xóa không",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await removeCategory(id);
        message.success("Xóa thành công");
        fetchData();
      },
      onCancel() {
        message.destroy("Xóa thất bại");
      },
    });
  };

  return (
    <div>
      <Button
        type="primary"
        className="mb-6"
        onClick={() => setOpenModalCreate(true)}
      >
        Thêm mới
      </Button>
      <Table columns={columns} dataSource={dateTable} size="middle" />
      <ModalCreateCategory
        open={openModalCreate}
        setOpen={setOpenModalCreate}
        fetchData={fetchData}
      />
      {openModalUpdate && dataUpdate && (
        <ModalUpdateCategory
          open={openModalUpdate}
          setOpen={setOpenModalUpdate}
          fetchData={fetchData}
          data={dataUpdate}
        />
      )}
    </div>
  );
};

export default DashboardCategory;
