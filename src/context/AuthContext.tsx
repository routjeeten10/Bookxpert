import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: { username: string; isAuthenticated: boolean } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ username: string; isAuthenticated: boolean } | null>(null);

  useEffect(() => {
    const auth = storage.getAuth();
    if (auth) {
      setUser(auth);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock authentication - accept any non-empty credentials
    if (username.trim() && password.trim()) {
      const authData = { username, isAuthenticated: true };
      storage.setAuth(username);
      setUser(authData);
      return true;
    }
    return false;
  };

  const logout = () => {
    storage.clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user?.isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
