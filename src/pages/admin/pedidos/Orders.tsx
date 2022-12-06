//react
import React, { ReactElement } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

//components
import ListPedidos from "../../../components/ListPedidos";

//antd
import { Row, Col, Card } from "antd";

//css
import styles from "../../../../styles/Orders.module.scss";

const Orders: NextPageWithLayout = () => {
  return (
    <>
      <Row>
        <Col xs={24} xl={24}>
          <Card title="Pedidos" className={styles.cardStyle}>
            <ListPedidos />
          </Card>
        </Col>
      </Row>
    </>
  );
};

Orders.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Orders;
