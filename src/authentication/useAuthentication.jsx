import { db } from "../firebase/conection";
import { doc, setDoc } from "firebase/firestore";

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

    setLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // Atualiza o perfil no Auth
      await updateProfile(user, {
        displayName: data.displayName,
      });

      // Cria o documento na collection 'users' no Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: data.displayName,
        isAdmin: false, // ou false por padrão
        createdAt: new Date(),
      });

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
    navigate("/login");
  };

  const login = async (data) => {
    if (checkIfIsCancelled()) return;

    setErrorAuth(null); // limpa erros anteriores

    setLoading(true);

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
