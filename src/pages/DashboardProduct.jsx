import { Button, Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ModalUpdateUser from "../components/ModalUpdateUser";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { getAll, remove } from "../api/product";
import ModalCreateProduct from "../components/ModalCreateProduct";
import ModalUpdateProduct from "../components/ModalUpdateProduct";

const DashboardProduct = () => {
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
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Image",
      render: (data) => {
        return (
          <img
            src={data.img}
            className="rounded"
            style={{ width: "50px", height: "50px" }}
            alt="imag"
          />
        );
      },
    },
    {
      title: "Brand",
      dataIndex: "brand",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
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
      const res = await getAll();
      const formatData = res.data.map((item, index) => {
        return {
          key: index,
          id: item.id,
          title: item.title,
          price: item.price,
          brand: item.brand,
          img: item.img,
          categoryId: item.categoryId,
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
        await remove(id);
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
      <ModalCreateProduct
        open={openModalCreate}
        setOpen={setOpenModalCreate}
        fetchData={fetchData}
      />
      {openModalUpdate && dataUpdate && (
        <ModalUpdateProduct
          open={openModalUpdate}
          setOpen={setOpenModalUpdate}
          fetchData={fetchData}
          data={dataUpdate}
        />
      )}
    </div>
  );
};

export default DashboardProduct;
