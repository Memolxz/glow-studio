import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SkinSelection from "./pages/Selection"
import AuthLayout from "./pages/AuthPage"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import Routine from "./pages/Routine"
import Home from "./pages/Home"
import FQ from "./pages/FAQ"
import RecommendationsPage from "./pages/Recommendations"
import { RequireAuth, RequireGuest } from './components/ProtectedRoute';

export default function App() {
    return (   
      <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/selection" element={<RequireAuth><SkinSelection /></RequireAuth>} />
          <Route path="/register" element={<RequireGuest><AuthLayout /></RequireGuest>} />
          <Route path="/products" element={<Products />} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faq" element={<FQ />} />
          <Route path="/recommendations" element={<RequireAuth><RecommendationsPage /></RequireAuth>} />
      </Routes>
    );
}