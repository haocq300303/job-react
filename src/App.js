import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./pages/Home";
import DetailProduct from "./pages/DetailProduct";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notfound from "./pages/Notfound";
import DashboardProduct from "./pages/DashboardProduct";
import DashboardCategory from "./pages/DashboardCategory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<DetailProduct />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/products" element={<DashboardProduct />} />
          <Route path="/admin/categories" element={<DashboardCategory />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="**" element={<Notfound />} />
      </Routes>
    </Router>
  );
}

export default App;
