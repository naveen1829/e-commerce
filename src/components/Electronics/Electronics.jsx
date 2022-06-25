import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "../Products/ProductCard";

const Electronics = () => {
  const [electronicProducts, setElectronicProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/electronics")
      .then((res) => res.json())
      .then((json) => setElectronicProducts(json));
  }, []);

  return (
    <div className="productArea">
      <Grid container justify="center" spacing={4}>
        {electronicProducts.map((product, index) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Electronics;
