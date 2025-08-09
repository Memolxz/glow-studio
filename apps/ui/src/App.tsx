import { Routes, Route } from 'react-router-dom'
import AuthLayout from "./pages/AuthPage"
import ContactUs from "./pages/ContactUs"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import Routine from "./pages/Routine"
import Home from "./pages/Home"
import FQ from "./pages/FQ"

export default function App() {
    return (
    <Routes>
      <Route path="/register" element={<AuthLayout />} />
      <Route path="/contactus" element={<ContactUs />} />
      <Route path="/products" element={<Products />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/routine" element={<Routine />} />
      <Route path="/home" element={<Home />} />
      <Route path="/fq" element={<FQ />} />
    </Routes>
    );
}

/* 
- mejorar header
mejorar footer
hacer pag faq
sacar pag contact

 */