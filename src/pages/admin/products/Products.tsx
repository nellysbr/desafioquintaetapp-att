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
import { Row, Col, Button, Card, Typography, Image } from "antd";
const { Title, Text, Paragraph } = Typography;

//css

import styles from "../../../../styles/Products.module.scss";
import Router from "next/router";

//api
import api from "../../api/api";

const Products: NextPageWithLayout = () => {
  const [cardapio, setCardapio] = useState<any[]>([]);
  useEffect(() => {
    api.get("/Cardapio").then((response) => {
      setCardapio(response.data);
    });
    console.log(cardapio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Row gutter={[32, 32]}>
          <Col xs={24} xl={24}>
            <Card className={styles.cardConsumer}>
              <Row gutter={8}>
                {cardapio.map((item) => {
                  return (
                    <Col
                      key={item.id}
                      xs={8}
                      xl={8}
                      className={styles.productCardsContainer}
                    >
                      <Card className={styles.minikanbam}>
                        <Row>
                          <Col xs={24} xl={24}>
                            <Image
                              src={item.imageURL}
                              width={100}
                              height={50}
                              alt="imagem produto"
                            />
                          </Col>
                          <Col xs={24} xl={24}>
                            <Paragraph>
                              <Text>Nome do produto: {item.nome}</Text>
                            </Paragraph>
                          </Col>
                          <Col xs={24} xl={24}>
                            <Paragraph>
                              <Text>Valor do produto: {item.valor} R$</Text>
                            </Paragraph>
                          </Col>
                          <Col xs={24} xl={24}>
                            <Paragraph>
                              <Text>
                                Descricao do produto: {item.description}
                              </Text>
                            </Paragraph>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Card>
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
