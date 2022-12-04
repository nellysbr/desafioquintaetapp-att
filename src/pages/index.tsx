//react
import { useState, useEffect } from "react";

//next
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";

//css
import styles from "../../styles/Home.module.scss";

//antd
import { Row, Col, Form, Card, Typography, Layout, Input, Button } from "antd";

import Alert from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const { Text } = Typography;
const { Content } = Layout;

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  // const [data, setData] = useState({
  //   email: "",
  //   password: "",
  // });

  useEffect(() => {
    setEmail(`${email}`);
    setPassword(`${password}`);

    console.log(email, password);
  }, [email, password]);

  const handleSubmit = async (e: any) => {
    try {
      await login(email, password);
      Router.push("/admin/dashboard/Dashboard");
    } catch (err) {
      let errorcode = String(err);
      if (errorcode === "auth/wrong-password") {
        Alert.fire({
          icon: "error",
          title: "Oops...",
          text: "Senhar incorreta!",
        });
      } else if (errorcode == "auth/user-not-found") {
        Alert.fire({
          icon: "error",
          title: "Oops...",
          text: "Email não encontrado!",
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Modulo Adm - Desafio Bolo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Content className={styles.content}>
          <Row>
            <Col xs={24} xl={24} className={styles.mainContainer}>
              <Card className={styles.loginCard}>
                <Col xs={24} xl={24} className={styles.imageContainer}>
                  <Image
                    src="/logo.png"
                    width={100}
                    height={100}
                    alt="logo desafio"
                    className={styles.logo}
                  />
                </Col>
                <Col xs={24} xl={24} className={styles.formContainer}>
                  <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                      htmlFor="email"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Por favor coloque o seu e-mail",
                        },
                      ]}
                      label={<Text className={styles.formLabel}>E-mail:</Text>}
                    >
                      <Input
                        name="email"
                        value={email}
                        type="email"
                        className={styles.formInput}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>

                    <Form.Item
                      htmlFor="password"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Por favor coloque o seu e-mail",
                        },
                      ]}
                      label={<Text className={styles.formLabel}>Senha:</Text>}
                    >
                      <Input.Password
                        name="password"
                        value={password}
                        type="password"
                        className={styles.formInput}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item className={styles.btnContainer}>
                      <Button htmlType="submit">Entrar</Button>
                    </Form.Item>
                  </Form>
                </Col>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Home;
