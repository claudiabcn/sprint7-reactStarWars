import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { loginUser, logoutUser, registerUser, loginWithGoogle } from '../services/authService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);


  const login = async (email: string, password: string) => {
    await loginUser(email, password);

  };

  const register = async (email: string, password: string) => {
    await registerUser(email, password);

  };

  const loginGoogle = async () => {
    await loginWithGoogle();

  };

  const logout = async () => {
    await logoutUser();

  };


  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      loginGoogle,
      logout,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};