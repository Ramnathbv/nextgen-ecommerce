import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/Login';

interface AuthContextValue {
  isAuthenticated: boolean;
  username?: string;
  openLogin: (redirectTo?: string) => void;
  login: (username?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [showLogin, setShowLogin] = useState(false);
  const [redirectTo, setRedirectTo] = useState<string | undefined>();
  const navigate = useNavigate();

  const openLogin = (to?: string) => {
    setRedirectTo(to);
    setShowLogin(true);
  };

  const login = (name?: string) => {
    setIsAuthenticated(true);
    setUsername(name);
    setShowLogin(false);
    if (redirectTo) {
      const path = redirectTo;
      setRedirectTo(undefined);
      navigate(path);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(undefined);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, username, openLogin, login, logout }}>
      {children}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onSuccessLogin={() => login()} />
      )}
    </AuthContext.Provider>
  );
};