import { db } from "./firebase/conection";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// Context
import { AuthContextProvider } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
// Hook custom
import { useAuthentication } from "./authentication/useAuthentication";

import { useState, useEffect } from "react";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home";
import Show from "./pages/Show";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Address from "./pages/Address";
import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup - Função de limpeza para cancelar
    // a inscrição do ouvinte quando o componente é desmontado
    return () => unsubscribe();
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <AuthContextProvider value={{user}}>
        {!hideLayout && <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<Show />} />
          <Route path="/category/:id" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login"/>} />
          <Route path="/address" element={user ? <Address /> : <Navigate to="/login"/>} />
          <Route path="/orders" element={user ? <Orders /> : <Navigate to="/login"/>} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login"/>} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/"/>} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/"/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {!hideLayout && <Footer />}
      </AuthContextProvider>
    </>
  );
}

export default App;
