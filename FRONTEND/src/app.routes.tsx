import { Routes, Route, BrowserRouter } from "react-router";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CreateProduct from "./components/CreateProduct";
import Viewproduct from "./components/Viewproduct";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyerDashboard from "./components/BuyerDashboard";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Routes (Seller Only) */}
                <Route element={<ProtectedRoute allowedRole="seller" />}>
                    <Route path="/seller/dashboard" element={<Dashboard />} />
                    <Route path="/seller/create-product" element={<CreateProduct />} />
                    <Route path="/seller/view-product" element={<Viewproduct />} />
                </Route>

                {/* Protected Routes (Buyer Only) */}
                <Route element={<ProtectedRoute allowedRole="buyer" />}>
                    <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}





