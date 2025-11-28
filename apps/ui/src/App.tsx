import { Routes, Route, Navigate } from 'react-router-dom';
import { RequireAuth, IsAdminUser } from './components/ProtectedRoute';
import RecommendationsPage from "./pages/Recommendations"
import SkinSelection from "./pages/Selection"
import AuthLayout from "./pages/AuthPage"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import Product from "./pages/Product"
import Users from "./pages/Users"
import Stats from "./pages/Stats"
import Home from "./pages/Home"
import FQ from "./pages/FAQ"


export default function App() {
    return (  
      <Routes>
          <Route path="/faq" element={<FQ />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/register" element={<AuthLayout /> } />
          <Route path="/" element={<Navigate to="/home" replace />} />


          {/* Protected Routes */}
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/selection" element={<RequireAuth><SkinSelection /></RequireAuth>} />
          <Route path="/recommendations" element={<RequireAuth><RecommendationsPage /></RequireAuth>} />
          <Route path="/users" element={<RequireAuth><IsAdminUser><Users /></IsAdminUser></RequireAuth>} />
          <Route path="/stats" element={<RequireAuth><IsAdminUser><Stats /></IsAdminUser></RequireAuth>} />
      </Routes>
    );
}

