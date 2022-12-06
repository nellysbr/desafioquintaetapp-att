//react
import React, { ReactElement } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

//components

import TableUsers from "../../../components/TableUsers";

const ClientList: NextPageWithLayout = () => {
  return <div><TableUsers /></div>;
};

ClientList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ClientList;
