import { Routes, Route, BrowserRouter } from "react-router";
import Register from "./components/Register";
import Login from "./components/Login";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}





