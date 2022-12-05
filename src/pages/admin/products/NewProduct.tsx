import React, { ReactElement } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

const NewProduct: NextPageWithLayout = () => {
  return <div>NewProduct</div>;
};

NewProduct.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default NewProduct;
