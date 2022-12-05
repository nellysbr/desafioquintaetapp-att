//react
import React, { ReactElement, useEffect, useState } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

//firebase
import { database } from "../../../lib/config";
import { collection, getDocs } from "firebase/firestore";
const dbInstance = collection(database, "Cardapio");

//antd
import { Row, Col, Button, Card, Typography } from "antd";
const { Title } = Typography;

//css

import styles from "../../../../styles/Products.module.scss";
import Router from "next/router";

//components
import ProductList from "../../../components/ProductList";

const Products: NextPageWithLayout = () => {
  const [dados, setDados] = useState<any>([]);

  const getData = async () => {
    getDocs(dbInstance).then((data) => {
      setDados(
        data.docs.map((item) => {
          return { ...item.data, id: item.id };
        })
      );
      console.log(dados);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Card
        className={styles.cardStyle}
        title={
          <>
            <Row>
              <Col xs={20} xl={20} className={styles.titleContainer}>
                <Title className={styles.cardTitle} level={3}>
                  Produtos
                </Title>
              </Col>
              <Col xs={4} xl={4} className={styles.titleContainer}>
                <Button
                  onClick={() => Router.push("/admin/products/NewProduct")}
                  className={styles.btnAdd}
                >
                  Adicionar produto
                </Button>
              </Col>
            </Row>
          </>
        }
      >
        <Row>
          <Col xs={24} xl={24} className={styles.productListContainer}>
            <ProductList />
          </Col>
        </Row>
      </Card>
    </>
  );
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Products;
