import { createContext, useState, useContext, type ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  name: string;
  login: (name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setname] = useState('');

  const login = (uname: string) => {
    setIsLoggedIn(true);
    setname(uname);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setname('');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};