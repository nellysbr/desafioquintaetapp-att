//react
import React, { ReactElement, useEffect } from "react";

//next
import Router from "next/router";

//layout
import { NextPageWithLayout } from "../../_app";
import { useAuth } from "../../../context/AuthContext";

//antd

import { Row, Col, Button } from "antd";

import MainLayout from "../../layout/MainLayout";

//css

const Dashboard: NextPageWithLayout = () => {
  const { user, logout } = useAuth();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return <div>{user ? "tem user" : "nao tem user"}</div>;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Dashboard;
