import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Toolbar from "@mui/material/Toolbar";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Categories from "./Categories/Categories";
import { Link } from "react-router-dom";
import logo from "../assets/e-commerce.png";
import MyPage from "../components/MyPage/MyPage";

const MenuBar = ({ cartTotal }) => {
  const [open, setOpen] = React.useState(false);
  const [openMyPageMenu, setOpenMyPageMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [myPageAnchorEl, setMyPageAnchorEl] = React.useState(null);

  const handleClickOpen = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleMyPageClickOpen = (event) => {
    setOpenMyPageMenu(true);
    setMyPageAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMyPageClose = () => {
    setOpenMyPageMenu(false);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClickOpen}
            title="Categories"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{ display: "flex", flexGrow: 1, textDecoration: "none" }}
            color="inherit"
          >
            <img
              src={logo}
              alt="ecommerce"
              height="32px"
              style={{ marginRight: "8px" }}
            />
            The Shopping Store
          </Typography>
          <IconButton
            component={Link}
            to="/cart"
            aria-label="Show cart items"
            color="inherit"
          >
            <Badge badgeContent={cartTotal} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMyPageClickOpen}
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Categories open={open} anchorEl={anchorEl} onClose={handleClose} />
      <MyPage
        open={openMyPageMenu}
        myPageAnchorEl={myPageAnchorEl}
        onClose={handleMyPageClose}
      />
    </>
  );
};

export default MenuBar;
