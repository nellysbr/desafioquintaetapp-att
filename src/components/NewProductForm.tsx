//react
import React, { useEffect, useState } from "react";

//antd
import { Typography, Row, Col, Form, Input, Button } from "antd";
const { Text, Title } = Typography;

//css
import styles from "../../styles/NewProductForm.module.scss";

//api
import api from "../pages/api/api";

//alertas
import Alert from "sweetalert2";

import { v4 } from "uuid";

//firebase
import { storage } from "../lib/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const NewProductForm = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [file, setFile] = useState<any>();
  const [fileURL, setFileURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = async (e: any) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async () => {
    const imageRef = ref(storage, `images/${nome}`);
    uploadBytes(imageRef, file).then(async () => {
      setIsLoading(true);
      const url = await getDownloadURL(imageRef);
      setFileURL(url);
      console.log(fileURL);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (fileURL === "") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setFileURL(`${fileURL}`);
    }
  }, [fileURL]);

  const handleSubmit = async (e: any) => {
    uploadImage();

    if (isLoading) {
      Alert.fire({
        icon: "error",
        title: "Oops...",
        text: "Aguarde o upload da imagem!",
      });
    } else {
      api
        .post("/Cardapio", {
          nome: nome,
          valor: valor,
          description: descricao,
          imageURL: fileURL,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
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
        <Form.Item
          htmlFor="image"
          name="image"
          label={<Text className={styles.formLabel}>Imagem do produto</Text>}
        >
          <Input
            placeholder="breve descricao"
            name="description"
            type="file"
            value={file}
            onChange={changeHandler}
          />
        </Form.Item>

        <Form.Item className={styles.btnContainer}>
          <Button
            className={styles.noselect}
            onClick={(e) => e.persist()}
            htmlType="submit"
          >
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default NewProductForm;
