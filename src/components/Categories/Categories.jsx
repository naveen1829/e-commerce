import { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

const Categories = (props) => {
  const { onClose, selectedValue, open, anchorEl } = props;

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
  }, []);

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleMenuItemClick = (value) => {
    onClose(value);
  };

  return (
    <Menu
      id="demo-positioned-menu"
      aria-labelledby="demo-positioned-button"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      {categories.map((category) => (
        <MenuItem
          button
          onClick={() => handleMenuItemClick(category)}
          key={category}
          component={Link}
          to={"/" + category}
        >
          {category}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default Categories;
