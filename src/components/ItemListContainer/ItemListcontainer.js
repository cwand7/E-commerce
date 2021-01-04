import { useState, useEffect } from "react";
import Greeting from "../Greeting/Greeting";
import ItemList from "./ItemList/ItemList";
import Spinner from "../Spinner/Spinner";
import { getProducts } from "../../dataBase/db";

const ItemListContainer = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getProducts().then((res) => {
        setItems(res);
        setLoading(false);
      });
    }, 1000);
  }, []);

  return (
    <>
      <Greeting greeting = {"Bienvenidos al mejor e-commerce!"} />
      {loading ? <Spinner /> : <ItemList items={items} />}
    </>
  );
};

export default ItemListContainer; 