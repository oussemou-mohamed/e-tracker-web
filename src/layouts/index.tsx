import {
  BuildTwoTone,
  CaretDownOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Row,
  Col,
  Avatar,
  Menu,
  theme,
  Dropdown,
  MenuProps,
  Space,
} from "antd";
import Sider from "antd/es/layout/Sider";
import { Header, Content, Footer } from "antd/es/layout/layout";
import { routes } from "../routes";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const items: MenuProps["items"] = [
  {
    key: "logout",
    label: "Logout",
  },
];

export const LayoutWrapper = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const auth = useAuth();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      auth.signoutSilent();
      navigate("/");
    }
  };

  return (
    <Layout>
      <Header
        style={{
          background: colorBgContainer,
        }}
      >
        <Row>
          <Col span={8}>
            <Link to="/">
              <span style={{ fontSize: "25px" }}>
                <BuildTwoTone /> E-Tracker
              </span>
            </Link>
          </Col>
          {auth.isAuthenticated && (
            <Col offset={14}>
              <Space size={8}>
                <Avatar icon={<UserOutlined />} />
                <Dropdown
                  menu={{ items, onClick: handleMenuClick }}
                  placement="bottom">
                  <CaretDownOutlined />
                </Dropdown>
              </Space>
            </Col>
          )}
        </Row>
      </Header>
      <Layout>
        {auth.isAuthenticated && (
          <Sider style={{ background: colorBgContainer }}>
            <div className="demo-logo-vertical" />
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={routes}
              onClick={({ key }) => {
                navigate(key);
              }}
            />
          </Sider>
        )}
        <Layout>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            E-Tracker ©2023 Created by Norsys Inc
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};
