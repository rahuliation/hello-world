import { Layout, Menu } from "antd";
import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import { CarryOutOutlined, CloudOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";

const { Content, Sider } = Layout;

const menuItems = [
  {
    icon: <CarryOutOutlined />,
    to: "/",
    text: "ToDo",
  },
  {
    icon: <CloudOutlined />,
    to: "/weather",
    text: "Weather",
  },
];

const MyLayout = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const location = useLocation();

  return (
    <Layout className="vh-100">
      <Sider trigger={null} className="h-100" collapsible={true} collapsed={isTabletOrMobile}>
        <span className="bg-white db pt3 pb2 tc fw8 f3-l"> HELLO WORLD </span>
        <Menu theme="dark" className="h-100" mode="inline" selectedKeys={[location.pathname]}>
          {menuItems.map(({icon, to, text}) => (
            <Menu.Item key={to} icon={icon}>
              <Link to={to}>{text}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content className="pt4 pl4">{children}</Content>
      </Layout>
    </Layout>
  );
};

const myLayoutHOC =
  (Component: React.FC): React.FC =>
  () =>
    (
      <MyLayout>
        <Component />
      </MyLayout>
    );

export default myLayoutHOC;
