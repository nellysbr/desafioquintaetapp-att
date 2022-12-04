//react
import React, { ReactElement } from "react";

//layout
import { NextPageWithLayout } from "../../_app";
import MainLayout from "../../layout/MainLayout";

const Products: NextPageWithLayout = () => {
  return <div>Products</div>;
};

Products.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Products;
