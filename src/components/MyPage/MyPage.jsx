import { Menu, MenuItem } from "@mui/material/";

const MyPage = (props) => {
  const { onClose, selectedValue, open, myPageAnchorEl } = props;

  const handleMyPageClose = () => {
    onClose(selectedValue);
  };

  return (
    <Menu
      id="composition-menu"
      aria-labelledby="composition-button"
      anchorEl={myPageAnchorEl}
      open={open}
      onClose={handleMyPageClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem onClick={handleMyPageClose}>Profile</MenuItem>
      <MenuItem onClick={handleMyPageClose}>My account</MenuItem>
      <MenuItem onClick={handleMyPageClose}>Logout</MenuItem>
    </Menu>
  );
};

export default MyPage;
