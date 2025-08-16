import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContextProvider";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

// Suas páginas
import Home from "./pages/Home";
import Show from "./pages/Show";
import Type from "./pages/Type";
import Perfil from "./pages/Perfil";
import Orders from "./pages/Orders";
import Create from "./pages/Address/Create";
import Edit from "./pages/Address/Edit";
import Photo from "./pages/Address/Photo";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  const hideLayout = hiddenRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <ToastContainer />
      {!hideLayout && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/address/create"
          element={
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          }
        />
        <Route
          path="/address/edit/:id"
          element={
            <PrivateRoute>
              <Edit />
            </PrivateRoute>
          }
        />
        <Route
          path="/photo/:id"
          element={
            <PrivateRoute>
              <Photo />
            </PrivateRoute>
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route path="/show/:id" element={<Show />} />
        <Route path="/type/:id" element={<Type />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </AuthProvider>
  );
}

export default App;
