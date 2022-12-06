//react
import React, { useEffect, useState } from "react";

//api
import api from "../pages/api/api";

//antd
import { Row, Col, Card, Button } from "antd";

//css
import styles from "../../styles/Listpedidos.module.scss";

//alerts
import Alerts from "sweetalert2";

//firebase
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { database } from "../lib/config";
const db = database;

const ListPedidos = () => {
  const [listaPedidos, setListaPedidos] = useState<any[]>([]);

  const confirmOrder = async (id: string) => {
    const userDoc = doc(db, "Pedidos", id);
    Alerts.fire({
      title: "Confirmar pedido",
      text: "Deseja confirmar o pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        updateDoc(userDoc, {
          orderStatus: "Confirmado",
        });
        Alerts.fire("Pedido confirmado!", "", "success");
      }
    });
  };

  const cancelOrder = async (id: string) => {
    const userDoc = doc(db, "Pedidos", id);
    Alerts.fire({
      title: "Cancelar pedido",
      text: "Deseja cancelar o pedido?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(userDoc);
        Alerts.fire("Pedido cancelado!", "", "success");
      }
    });
  };

  useEffect(() => {
    const getPedidos = async () => {
      const response = await api.get("/Pedidos");
      setListaPedidos(response.data);
    };
    getPedidos();
    console.log(listaPedidos);
    console.log(listaPedidos[0]);
    console.log(listaPedidos[1]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row className={styles.cardPedidos}>
        {listaPedidos.map((pedido) => {
          return (
            <Col xs={8} xl={8} key={pedido.id}>
              <Card
                title={pedido.nomeItem}
                extra={
                  <>
                    <Button
                      className={styles.btnCancel}
                      onClick={() => cancelOrder(pedido.id)}
                    >
                      x
                    </Button>
                    <Button
                      className={styles.btnAccept}
                      onClick={() => confirmOrder(pedido.id)}
                    >
                      O
                    </Button>
                  </>
                }
              >
                <p>Nome do cliente: {pedido.nomeCliente}</p>
                <p>
                  Endereço: {pedido.endereco} - {pedido.numero}
                </p>
                <p>Oberservação: {pedido.observacao}</p>
                <p>Telefone: {pedido.telefone}</p>
                <p>Status: {pedido.orderStatus}</p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ListPedidos;
