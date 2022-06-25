import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styled from "styled-components";

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
  const { image, title, price } = props;

  return (
    <>
      <Card
        variant="elevation"
        sx={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
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
          <Button size="small">Add to cart</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ProductCard;
