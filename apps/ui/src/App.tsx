import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthGuard from './components/AuthGuard';
// import ProtectedRoute from './components/ProtectedRoute';
// import AuthRedirect from './components/AuthRedirect';

import SkinSelection from "./pages/Selection"
import AuthLayout from "./pages/AuthPage"
import Products from "./pages/Products"
import Profile from "./pages/Profile"
import Routine from "./pages/Routine"
import Home from "./pages/Home"
import FQ from "./pages/FAQ"
import RecommendationsPage from "./pages/Recommendations"

export default function App() {
    return (
    <Routes>
      <AuthGuard>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/selection" element={<SkinSelection />} />
        <Route path="/register" element={<AuthLayout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/home" element={<Home />} />
        <Route path="/faq" element={<FQ />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
      </AuthGuard>
    </Routes>
    );
}
