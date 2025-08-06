import { Routes, Route } from 'react-router-dom'
import ContactUs from "./pages/Contact"
import AuthLayout from "./pages/AuthPage"

export default function App() {
    return (
    <Routes>
      <Route path="/" element={<AuthLayout />} />   
      <Route path="/contactus" element={<ContactUs />} />
    </Routes>
    );
}
