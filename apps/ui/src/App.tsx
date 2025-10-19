import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SkinSelection from "./pages/Selection"
import AuthLayout from "./pages/AuthPage"
import Products from "./pages/Products"
import Product from "./pages/Product"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import FQ from "./pages/FAQ"
import RecommendationsPage from "./pages/Recommendations"
import { RequireAuth, RequireGuest } from './components/ProtectedRoute';

export default function App() {
    return (   
      <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/register" element={<AuthLayout /> } />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/home" element={<Home />} />
          <Route path="/faq" element={<FQ />} />

          {/* Protected Routes */}
          <Route path="/selection" element={<RequireAuth><SkinSelection /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/recommendations" element={<RequireAuth><RecommendationsPage /></RequireAuth>} />

          {/* <Route path="/profile" element={<Profile />} />
          <Route path="/selection" element={<SkinSelection />} />
          <Route path="/recommendations" element={<RecommendationsPage />} /> */}
      </Routes>
    );
}