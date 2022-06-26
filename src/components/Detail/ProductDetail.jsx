import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Paper, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../Spinner/Loading";

const ProductDetail = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((json) => {
        setProductDetail(json);
        setFetched(true);
      });
  }, [id]);

  return (
    <>
      {fetched ? (
        <div style={{ padding: "32px" }}>
          <Paper elevation={3} sx={{ padding: "32px" }}>
            <Typography variant="h4">{productDetail.category}</Typography>
            <Grid
              container
              justify="center"
              spacing={2}
              sx={{ padding: "32px" }}
            >
              <Grid item>
                <img
                  src={productDetail.image}
                  alt="product"
                  style={{ height: "400px" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography variant="h4">{productDetail.title}</Typography>
                <Typography variant="body1">
                  {productDetail.description}
                </Typography>
                <br />
                <Typography variant="h4">₹{productDetail.price}</Typography>
                <br />
                <Button variant="outlined" startIcon={<AddIcon />}>
                  Add to cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
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

export default ProductDetail;
