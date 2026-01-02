import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import LoginScreen from "./components/auth/LoginScreen";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "sonner";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Public Route (redirect to dashboard if logged in)
const PublicRoute = ({ children }) => {
    const { user } = useAuth();
    if (user) {
        return <Navigate to="/" replace />;
    }
    return children;
};

const AppContent = () => {
  return (
    <Routes>
      <Route path="/login" element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
      } />
      <Route path="/" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="App dark bg-[#050505] min-h-screen font-sans">
      <BrowserRouter>
        <AuthProvider>
            <AppContent />
            <Toaster position="top-center" theme="dark" richColors />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
