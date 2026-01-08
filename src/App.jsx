import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import AdminLogin from './admin/AdminLogin'
import AdminPanel from './admin/AdminPanel'
import ResetPassword from './admin/ResetPassword'
import ProtectedRoute from './admin/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Portfolio Route */}
        <Route path="/" element={
          <div className="app">
            <Header />
            <Home />
            <About />
            <Gallery />
            <Contact />
          </div>
        } />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        
        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
