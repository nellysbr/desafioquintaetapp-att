//react
import React, { useEffect, useState } from "react";

//api
import api from "../pages/api/api";

//antd

import { Card, Row, Col, Typography, Image } from "antd";
const { Text, Title, Paragraph } = Typography;

//import

import styles from "../../styles/ProductList.module.scss";

const ProductList = () => {
  const [cardapio, setCardapio] = useState<any[]>([]);
  useEffect(() => {
    api.get("/Cardapio").then((response) => {
      setCardapio(response.data);
    });
    console.log(cardapio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.teste}>
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
                        <Text>Descricao do produto: {item.description}</Text>
                      </Paragraph>
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Card>
    </div>
  );
};

export default ProductList;
