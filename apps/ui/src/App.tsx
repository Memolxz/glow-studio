import { Routes, Route } from 'react-router-dom'
import SkinSelection from "./pages/Selection"
import AuthLayout from "./pages/AuthPage"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import Routine from "./pages/Routine"
import Home from "./pages/Home"
import FQ from "./pages/FAQ"

export default function App() {
    return (
    <Routes>
      <Route path="/selection" element={<SkinSelection />} />
      <Route path="/register" element={<AuthLayout />} />
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/routine" element={<Routine />} />
      <Route path="/home" element={<Home />} />
      <Route path="/faq" element={<FQ />} />
    </Routes>
    );
}
