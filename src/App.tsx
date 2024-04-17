import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import About from "./containers/About";
import Cart from "./containers/Cart";
import Home from "./containers/Home";
import Layout from "./containers/Layout";
import Products from "./containers/Products";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
      <Toaster position="top-right" containerStyle={{ top: "5rem" }}/>
    </>
  );
}

export default App;
