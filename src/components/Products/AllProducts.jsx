import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid";

const AllProducts = (props) => {
  const { products } = props;
  return (
    <div className="productArea">
      <Grid container justify="center" spacing={4}>
        {products.map((product, index) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard {...product} key={index} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AllProducts;
