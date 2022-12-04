//react
import React from "react";

//next

import Image from "next/image";
import Router from "next/router";
import dynamic from "next/dynamic";

//antd
import { Layout, Row, Col, Menu, Typography, Button } from "antd";
const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

//types
type Props = {
  children: React.ReactNode;
};

import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

//css
import styles from "../../../styles/MainLayout.module.scss";

//icons ImExit

import { RxDashboard } from "react-icons/rx";
import { FaClipboardList, FaUserFriends } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { ImExit } from "react-icons/im";

//autenticador firebase
import { useAuth } from "../../context/AuthContext";

//function menu itens

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

//menu itens
const items: MenuProps["items"] = [
  getItem(
    <a onClick={() => Router.push("/admin/dashboard/Dashboard")}>Dashboard</a>,
    "1",
    <RxDashboard />
  ),
  getItem(
    <a onClick={() => Router.push("/admin/pedidos/Orders")}>Pedidos</a>,
    "2",
    <FaClipboardList />
  ),
  getItem(
    <a onClick={() => Router.push("/admin/products/Products")}>Produtos</a>,
    "3",
    <AiOutlineShoppingCart />
  ),
  getItem(
    <a onClick={() => Router.push("/admin/registerClient/ClientList")}>
      Clientes
    </a>,
    "4",
    <FaUserFriends />
  ),
];

const Navbar: React.FC<Props> = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <Layout style={{ minHeight: "100vmin" }}>
      <Sider theme="light" width={340}>
        <Row justify="center" style={{ padding: "2em" }}>
          <Image src="/logo.png" height={50} width={80} alt="logo desafio" />
        </Row>
        <Menu
          className={styles.menu}
          theme="light"
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Row>
            <Col xs={22} xl={22} className={styles.headerContainer}>
              <Title level={3} className={styles.headerTitle}>
                Modulo ADM - DESAFIO QUINTA ETAPA
              </Title>
            </Col>
            <Col xs={2} xl={2}>
              <Button
                onClick={() => {
                  logout;
                  Router.push("/");
                }}
                icon={<ImExit />}
              >
                Sair
              </Button>
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
