import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import AllProducts from "./components/Products/AllProducts";
import Electronics from "./components/Electronics/Electronics";
import Jewelery from "./components/Jewelery/Jewelery";
import MensClothing from "./components/MensClothing/MensClothing";
import WomensClothing from "./components/WomensClothing/WomensClothing";
import ProductDetail from "./components/Detail/ProductDetail";
import Cart from "./components/Cart/Cart";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getTotals } from "./context/cart";
import Loading from "./components/Spinner/Loading";

const App = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return status === "success" ? (
    <Router>
      <MenuBar cartTotal={cart.cartTotalQuantity} />
      <Routes>
        <Route exact path="/" element={<AllProducts products={items} />} />
        <Route path="products" element={<AllProducts products={items} />} />
        <Route path="/products/productDetail/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart items={cart} />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="jewelery" element={<Jewelery />} />
        <Route path="men's%20clothing" element={<MensClothing />} />
        <Route path="women's%20clothing" element={<WomensClothing />} />
      </Routes>
    </Router>
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
  );
};

export default App;
