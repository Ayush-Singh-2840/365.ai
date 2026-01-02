import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('current_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [loading, setLoading] = useState(false);

  const requestOtp = async (phoneNumber) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    toast.success(`OTP sent to ${phoneNumber}`, {
      description: "Use code 1234 to login",
      duration: 5000,
    });
    return true;
  };

  const verifyOtp = async (phoneNumber, otp) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);

    if (otp === '1234') {
      const userData = { phoneNumber, id: phoneNumber.replace(/\D/g, '') };
      setUser(userData);
      localStorage.setItem('current_user', JSON.stringify(userData));
      toast.success("Welcome back!", {
        description: "Your goal dashboard is ready."
      });
      return true;
    } else {
      toast.error("Invalid OTP", {
        description: "Please try again (Hint: 1234)"
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, requestOtp, verifyOtp, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
