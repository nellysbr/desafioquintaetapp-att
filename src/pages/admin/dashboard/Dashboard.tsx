//react
import React, { ReactElement, useEffect, useState } from "react";

//next
import Router from "next/router";

//layout
import { NextPageWithLayout } from "../../_app";
import { useAuth } from "../../../context/AuthContext";
import MainLayout from "../../layout/MainLayout";

//antd

import { Row, Col, Button } from "antd";

//firebase
import { app, database } from "../../../lib/config";
import { collection, getDocs } from "firebase/firestore";
const dbInstance = collection(database, "Cardapio");

const Dashboard: NextPageWithLayout = () => {
  const { user, logout } = useAuth();

  const getData = async () => {
    getDocs(dbInstance).then((data) => {
      console.log(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return <div>{user ? "tem user" : "nao tem user"}</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
