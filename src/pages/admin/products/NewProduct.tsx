import React, { ReactElement } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

//antd
import { Row, Col, Button, Card, Typography } from "antd";
const { Title } = Typography;

//css
import styles from "../../../../styles/NewProduct.module.scss";

//next
import Router from "next/router";
import NewProductForm from "../../../components/NewProductForm";

const NewProduct: NextPageWithLayout = () => {
  return (
    <>
      <Card
        className={styles.cardStyle}
        title={
          <Row>
            <Col xs={20} xl={20} className={styles.titleContainer}>
              <Title className={styles.cardTitle} level={3}>
                Novo produto
              </Title>
            </Col>
            <Col xs={4} xl={4} className={styles.titleContainer}>
              <Button
                onClick={() => Router.push("/admin/products/Products")}
                className={styles.btnAdd}
              >
                Voltar
              </Button>
            </Col>
          </Row>
        }
      >
        <NewProductForm />
      </Card>
    </>
  );
};

NewProduct.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default NewProduct;
