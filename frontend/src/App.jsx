import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Product from './pages/Product';
import Dashboard from "./pages/Home";
import ProductFormCard from "./pages/ProductForm";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/dashboard" element={<Dashboard/>}></Route>
          <Route path="/products" element={<Product/>}></Route>
          <Route path="/products/create" element={<ProductFormCard />} />
          <Route path="/products/edit/:id" element={<ProductFormCard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
