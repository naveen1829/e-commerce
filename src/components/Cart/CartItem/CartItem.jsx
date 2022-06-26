import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  addToCart,
  getTotals,
  decreaseCart,
  clearCart,
} from "../../../context/cart";
import styled from "styled-components";

const Title = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
  font-weight: 700;
  font-size: 18px;
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [cartCountBasedOnProduct, setCartCountBasedOnProduct] = useState(0);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    cart.cartItems
      ?.filter((data) => data.id === item.id)
      .forEach((data) => {
        setCartCountBasedOnProduct(data.cartQuantity);
      });
  }, [cart, item.id]);

  return (
    <Card
      variant="elevation"
      elevation={3}
      sx={{
        maxWidth: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
      }}
    >
      <CardMedia
        component="img"
        height="250"
        image={item.image}
        alt="product"
        sx={{
          objectFit: "contain",
        }}
      />
      <CardContent>
        <Title title={item.title}>{item.title}</Title>
        <Typography fontWeight={700} variant="h5">
          ₹{item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="remove"
            color="error"
            onClick={(event) => {
              event.stopPropagation();
              if (cart.cartTotalQuantity === 1) {
                dispatch(clearCart());
              } else {
                dispatch(decreaseCart(item));
              }
            }}
          >
            <RemoveIcon />
          </IconButton>
          <Typography>&nbsp;{cartCountBasedOnProduct}&nbsp;</Typography>
          <IconButton
            aria-label="add"
            color="primary"
            onClick={(event) => {
              event.stopPropagation();
              dispatch(addToCart(item));
            }}
          >
            <AddIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
};

export default CartItem;
