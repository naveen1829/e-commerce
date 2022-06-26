import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

import CartItem from "./CartItem/CartItem";
import { clearCart, getTotals } from "../../context/cart";

const Cart = () => {
  const dispatch = useDispatch();
  const handleEmptyCart = () => dispatch(clearCart());
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const renderEmptyCart = () => (
    <Typography variant="h6">
      You have no items in your shopping cart,&nbsp;
      <Link to="/" style={{ textDecoration: "none" }}>
        Continue Shopping
      </Link>
      !
    </Typography>
  );

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.cartItems.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} />
          </Grid>
        ))}
        <Grid item xs={8}>
          <Paper elevation={3} sx={{ padding: "32px" }}>
            <Typography fontWeight={700} variant="h4">
              Order Summary
            </Typography>
            <Divider />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  sx={{ marginTop: "4px" }}
                  fontWeight={700}
                  variant="h5"
                >
                  Subtotal:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography fontWeight={700} variant="h4">
                  ₹{cart.cartTotalAmount}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  component={Link}
                  to="/checkout"
                  size="large"
                  type="button"
                  variant="contained"
                  color="primary"
                >
                  Proceed to Checkout
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  size="large"
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleEmptyCart}
                >
                  Empty cart
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );

  return (
    <Container>
      <div style={{ padding: "32px" }} />
      <Typography fontWeight={700} variant="h2" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.cartItems.length ? renderEmptyCart() : renderCart()}
    </Container>
  );
};

export default Cart;
