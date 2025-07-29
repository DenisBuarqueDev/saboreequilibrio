import React from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../authentication/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Footer = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <footer className=" w-full p-4 bg-white border-t border-gray-200">
      <div className="max-w-screen-xl flex flex-col m-auto items-center md:flex-row md:justify-between md:p-6">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2025 All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <Link to="/" className="hover:underline me-4 md:me-6">
              Início
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:underline me-4 md:me-6">
              Carrinho
            </Link>
          </li>
          {!user && (
            <>
              <li>
                <Link to="/register" className="hover:underline me-4 md:me-6">
                  Cadastre-se
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline me-4 md:me-6">
                  Entrar
                </Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/address" className="hover:underline me-4 md:me-6">
                  Endereço
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:underline me-4 md:me-6">
                  Pedidos
                </Link>
              </li>
              <li>
                <buttom onClick={logout} className="hover:underline me-4 md:me-6 cursor-pointer">
                  Sair
                </buttom>
              </li>
            </>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
