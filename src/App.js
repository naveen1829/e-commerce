import { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import AllProducts from "./components/Products/AllProducts";
import Electronics from "./components/Electronics/Electronics";
import Jewelery from "./components/Jewelery/Jewelery";
import MensClothing from "./components/MensClothing/MensClothing";
import WomensClothing from "./components/WomensClothing/WomensClothing";
import MenuBar from "./components/MenuBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, []);

  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route exact path="/" element={<AllProducts products={products} />} />
        <Route path="products" element={<AllProducts products={products} />} />
        <Route path="electronics" element={<Electronics />} />
        <Route path="jewelery" element={<Jewelery />} />
        <Route path="men's%20clothing" element={<MensClothing />} />
        <Route path="women's%20clothing" element={<WomensClothing />} />
      </Routes>
    </Router>
  );
};

export default App;
