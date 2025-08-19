import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const isAuthenticated = !!user;

  // pega o estado do usuário logado
  const getStateUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/auth/me", { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      getStateUser();
    }
  }, [loading, user]);

  const register = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post("/api/auth/register", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.replace(/\D/g, ""), // Remove caracteres não numéricos
        email: formData.email.trim(),
        password: formData.password,
      });
      setUser(res.data.user);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      //const status = error.response?.status;
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post(
        "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      toast.success(res.data.message);
      //navigate("/");
    } catch (error) {
      console.error("Erro no login:", error.response?.data || error.message);
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.post("/api/auth/logout", {}, { withCredentials: true });
      toast.success("Usuário desconectado!");
      navigate("/");
    } catch (err) {
      toast.error("Erro ao fazer logout.");
      console.error("Erro ao fazer logout:", err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
