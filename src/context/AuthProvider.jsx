

import { useState } from "react";
import { AuthContext } from "./AuthContext";


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("auth_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email) => {
    const u = { email };
    setUser(u);
    localStorage.setItem("auth_user", JSON.stringify(u));
  };

  const signup = (email) => login(email);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
