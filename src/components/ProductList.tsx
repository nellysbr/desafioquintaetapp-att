//react
import React, { useEffect, useState } from "react";

//api
import api from "../pages/api/api";

const ProductList = () => {
  const [cardapio, setCardapio] = useState<any[]>([]);
  useEffect(() => {
    api.get("/Cardapio").then((response) => {
      setCardapio(response.data);
    });
    console.log(cardapio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ul>
        {cardapio.map((item) => {
          return <li key={item.id}>{item.nome}</li>;
        })}
      </ul>
    </>
  );
};

export default ProductList;
