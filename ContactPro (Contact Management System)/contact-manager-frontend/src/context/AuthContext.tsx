import { createContext, useContext, useState, useEffect } from "react";
import { setAuth } from "../api/axios";

interface AuthState {
  username: string | null;
  role: string | null;
  token?: string | null;
}

interface AuthContextType {
  auth: AuthState;
  setAuthState: (auth: AuthState) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuthState] = useState<AuthState>({
    username: null,
    role: null,
    token: null,
  });

  // 🔥 Restore auth on app load
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const parsed = JSON.parse(stored);
      setAuthState(parsed);

      // Restore axios header
      if (parsed.username && parsed.token) {
        setAuth(parsed.username, parsed.token, true);
      }
    }
  }, []);

  const logout = () => {
    setAuthState({ username: null, role: null, token: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
