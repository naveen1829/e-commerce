import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Paper,
  Typography,
  Button,
  Rating,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Loading from "../Spinner/Loading";
import {
  addToCart,
  getTotals,
  decreaseCart,
  clearCart,
} from "../../context/cart";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  const [fetched, setFetched] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAddToCartVisible, setIsAddToCartVisible] = useState(true);

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/" + id)
      .then((res) => res.json())
      .then((json) => {
        setProductDetail(json);
        setFetched(true);
      });
  }, [id]);

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addToCart(productDetail));
    setIsVisible(true);
    setIsAddToCartVisible(false);
  };

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
                  style={{ height: "400px", maxWidth: "400px" }}
                />
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={700} variant="h4">
                  {productDetail.title}
                </Typography>
                <Typography variant="body1">
                  {productDetail.description}
                </Typography>
                <br />
                <Typography fontWeight={700} variant="h4">
                  ₹{productDetail.price}
                </Typography>
                <br />
                {isAddToCartVisible && (
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddToCart}
                  >
                    Add to cart
                  </Button>
                )}
                {isVisible && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton
                      aria-label="remove"
                      color="error"
                      onClick={() => {
                        if (cart.cartTotalQuantity === 1) {
                          setIsAddToCartVisible(true);
                          setIsVisible(false);
                          dispatch(clearCart());
                        } else {
                          dispatch(decreaseCart(productDetail));
                        }
                      }}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography>
                      &nbsp;{cart.cartTotalQuantity}&nbsp;
                    </Typography>
                    <IconButton
                      aria-label="add"
                      color="primary"
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(addToCart(productDetail));
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                )}

                <br />
                <br />
                <br />
                <Typography variant="h5" component="legend">
                  Reviews
                </Typography>
                <Rating
                  name="read-only"
                  value={productDetail.rating.rate}
                  readOnly
                />
                <Typography variant="body1" component="legend">
                  {`(${productDetail.rating.count})`}
                </Typography>
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
