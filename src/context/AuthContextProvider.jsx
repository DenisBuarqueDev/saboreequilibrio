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

  //Verifica usuário logado ao carregar a aplicação
  const fetchCurrentUser = async () => {
    try {
      const res = await api.get("/api/auth/me", { withCredentials: true });
      setUser(res.data.user); // pega o user do backend
    } catch (error) {
      setUser(null);
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
    } catch (error) {
      console.error("Erro no login:", error.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await api.post("/api/auth/logout", {});
      setUser(null);
    } catch (err) {
      toast.error("Erro ao fazer logout.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, loading, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthValue() {
  return useContext(AuthContext);
}
