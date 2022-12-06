import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "antd";
import { getDatabase, ref, child, get } from "firebase/database";

const {} = Table;

const dbRef = ref(getDatabase());

let users: any[] = [];

const columns = [
  {
    title: <h1>Nome</h1>,
    dataIndex: "nome",
    key: "nome",
  },
  {
    title: <h1>E-mail</h1>,
    dataIndex: "email",
    key: "email",
  },
  {
    title: <h1>Telefone</h1>,
    dataIndex: "telefone",
    key: "telefone",
  },
];

const TableUsers = () => {
  const [listUsers, setlistUsers] = useState<any[]>([]);

  const getUsers = async () => {
    get(child(dbRef, "usuarios"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let rawData = snapshot.val();

          for (let key in rawData) {
            let a = {
              key: rawData[key].id,
              email: rawData[key].email,
              nome: rawData[key].nome,
              telefone: rawData[key].telefone,
            };
            setlistUsers((prev) => [...prev, a]);
          }
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Row>
        <Col xs={24} xl={24}>
          <Table columns={columns} dataSource={listUsers} />
        </Col>
      </Row>
    </>
  );
};

export default TableUsers;
