import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "../Products/ProductCard";
import Loading from "../Spinner/Loading";

const Jewelery = () => {
  const [jeweleryProducts, setJeweleryProducts] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((json) => {
        setJeweleryProducts(json);
        setFetched(true);
      });
  }, []);

  return (
    <>
      {fetched ? (
        <div style={{ padding: "32px" }}>
          <Grid container justify="center" spacing={4}>
            {jeweleryProducts.map((product, index) => (
              <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <ProductCard {...product} key={index} />
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div
          style={{
            left: "50%",
            position: "absolute",
            textAlign: "center",
            top: "50%",
          }}
        >
          <Loading />
        </div>
      )}
    </>
  );
};

export default Jewelery;
