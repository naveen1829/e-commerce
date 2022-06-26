import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
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
} from "../../context/cart";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Title = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: normal;
  word-break: break-word;
  font-weight: 700;
`;

const ProductCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, image, title, price } = props;
  const [cartCountBasedOnProduct, setCartCountBasedOnProduct] = useState(0);

  const navigateToDetail = () => {
    navigate("/products/productDetail/" + id);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    dispatch(addToCart(props));
  };

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  useEffect(() => {
    cart.cartItems.length
      ? cart.cartItems
          .filter((data) => data.id === id)
          .forEach((data) => {
            setCartCountBasedOnProduct(data.cartQuantity);
          })
      : setCartCountBasedOnProduct(0);
  }, [cart, id]);

  return (
    <>
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
        onClick={navigateToDetail}
      >
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="product"
          sx={{
            objectFit: "contain",
          }}
        />
        <CardContent>
          <Title title={title}>{title}</Title>
          <Typography fontWeight={700} variant="h5">
            ₹{price}
          </Typography>
        </CardContent>
        <CardActions>
          {cartCountBasedOnProduct === 0 && (
            <Button
              size="small"
              startIcon={<AddIcon />}
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
          {cartCountBasedOnProduct > 0 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <IconButton
                aria-label="remove"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  if (cart.cartTotalQuantity === 1) {
                    dispatch(clearCart());
                  } else {
                    dispatch(decreaseCart(props));
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
                  dispatch(addToCart(props));
                }}
              >
                <AddIcon />
              </IconButton>
            </div>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
