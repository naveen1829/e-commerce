import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
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
`;

const ProductCard = (props) => {
  const { id, image, title, price } = props;
  const navigate = useNavigate();

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    fetch("https://fakestoreapi.com/carts", {
      method: "POST",
      body: JSON.stringify({
        userId: 5,
        date: new Date().getTime(),
        products: [{ productId: id, quantity: 1 }],
      }),
    });
  };

  const navigateToDetail = () => {
    navigate("/products/productDetail/" + id);
  };

  return (
    <>
      <Card
        variant="elevation"
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
          <Typography variant="h5">₹{price}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
