//react
import React, { useState } from "react";

//antd
import { Typography, Row, Col, Form, Input, Button } from "antd";
const { Text, Title } = Typography;

//css
import styles from "../../styles/NewProductForm.module.scss";

//api
import api from "../pages/api/api";

const NewProductForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = async (e: any) => {
    api
      .post("/Cardapio", {
        nome: nome,
        valor: valor,
        description: descricao,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          htmlFor="name"
          name="name"
          rules={[
            {
              required: true,
              message: "Digite um nome para o produto",
            },
          ]}
          label={<Text className={styles.formLabel}>Nome</Text>}
        >
          <Input
            placeholder="Nome do produto"
            name="name"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          htmlFor="valor"
          name="valor"
          rules={[
            {
              required: true,
              message: "Por favor digite o valor do produto",
            },
          ]}
          label={<Text className={styles.formLabel}>Valor</Text>}
        >
          <Input
            placeholder="valor do produto"
            name="valor"
            type="text"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          htmlFor="description"
          name="description"
          rules={[
            {
              required: true,
              message: "Por favor digite a descrição do produto",
            },
          ]}
          label={<Text className={styles.formLabel}>Descrição</Text>}
        >
          <Input
            placeholder="breve descricao"
            name="description"
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Form.Item>
        <Form.Item className={styles.btnContainer}>
          <Button className={styles.noselect} htmlType="submit">
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewProductForm;
