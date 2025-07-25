import { db } from "../firebase/conection";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthentication = () => {
  const [errorAuth, setErrorAuth] = useState(null);
  const [loading, setLoading] = useState(null);

  const navigate = useNavigate();

  //cleanup
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const auth = getAuth();

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(false);
    setErrorAuth(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, {
        displayName: data.displayName,
      });

      setLoading(false);

      return user;
    } catch (error) {
      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um error...";
      }
      setLoading(false);
      setErrorAuth(systemErrorMessage);
    }
  };

  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setErrorAuth(null); // limpa erros anteriores

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      if (user) {
        navigate("/"); // Redireciona após login bem-sucedido
      }
    } catch (error) {
      console.error("Erro de login:", error);

      let systemErrorMessage;

      if (error.code === "auth/user-not-found") {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.code === "auth/wrong-password") {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Erro ao fazer login. Tente novamente.";
      }

      setErrorAuth(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, logout, login, loading, errorAuth };
};
