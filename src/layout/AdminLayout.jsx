import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SwitcherOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import Item from "antd/es/list/Item";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <h1 className=""> Admin</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          className="flex flex-col gap-3 p-2"
        >
          <Item
            key="users"
            className="flex items-center hover:bg-gray-500 p-4 rounded"
          >
            <Link to="/admin" className="flex gap-2 items-center">
              <p>Users</p>
              <span>
                <UserOutlined />
              </span>
            </Link>
          </Item>
          <Item
            key="products"
            className="flex items-center hover:bg-gray-500 p-4 rounded"
          >
            <Link to="/admin/products" className="flex gap-2 items-center">
              <p to="/admin/products">Products</p>
              <span>
                <SwitcherOutlined />
              </span>
            </Link>
          </Item>
          <Item
            key="categories"
            className="flex items-center hover:bg-gray-500 p-4 rounded"
          >
            <Link to="/admin/categories" className="flex gap-2 items-center">
              <p>Categories</p>
              <span>
                <PieChartOutlined />
              </span>
            </Link>
          </Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 600,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
