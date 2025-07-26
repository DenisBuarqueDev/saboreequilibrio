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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //cleanup
  const [cancelled, setCancelled] = useState(false);

  function checkIfIsCancelled() {
    if (!cancelled) {
      return true;
    }
    return false;
  }

  const auth = getAuth();

  const createUser = async (data) => {

    if (checkIfIsCancelled()) return;

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

      switch (error.code) {
        case "auth/email-already-in-use":
          systemErrorMessage = "E-mail já cadastrado.";
          break;
        case "auth/weak-password":
          systemErrorMessage = "A senha precisa ter pelo menos 6 caracteres.";
          break;
        case "auth/invalid-email":
          systemErrorMessage = "E-mail inválido.";
          break;
        default:
          systemErrorMessage = "Erro ao cadastrar. Tente novamente.";
      }
      setErrorAuth(systemErrorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (checkIfIsCancelled()) return;
    signOut(auth);
  };

  const login = async (data) => {

    if (checkIfIsCancelled()) return;

    setErrorAuth(null); // limpa erros anteriores

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      //setLoading(false);

      if (user) {
        navigate("/"); // Redireciona após login bem-sucedido
      }

    } catch (error) {
      //console.error("Erro de login:", error);

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
