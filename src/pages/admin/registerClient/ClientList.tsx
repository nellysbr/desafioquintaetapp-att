//react
import React, { ReactElement } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

const ClientList: NextPageWithLayout = () => {
  return <div>ClientList</div>;
};

ClientList.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default ClientList;
