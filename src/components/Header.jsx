import React from "react";
import { NavLink, Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import { useAuthentication } from "../authentication/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  return (
    <header>
      <nav className="bg-white border-gray-200 border-b">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <NavLink to="/" className="text-green-700">
              <FaArrowLeft className="mr-3" />
            </NavLink>
            <span className="self-center text-2xl text-green-700 font-bold whitespace-nowrap">
              Sabor e Equilíbrio
            </span>
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
              <li>
                <NavLink
                  to="/"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  Início
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  Sobre
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/cart"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                >
                  Carrinho
                </NavLink>
              </li>
              {!user && (
                <>
                  <li>
                    <NavLink
                      to="/register"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                    >
                      Cadastre-se
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/login"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                    >
                      Entrar
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li>
                    <NavLink
                      to="/perfil"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                    >
                      Perfil
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                    >
                      Pedidos
                    </NavLink>
                  </li>
                  <li>
                    <buttom
                      onClick={logout}
                      className="block py-2 px-3 text-gray-900 rounded-sm cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                    >
                      Sair
                    </buttom>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        {user ? (
          <p>Bem-vindo(a) <strong>{user.displayName}</strong></p>
        ) : (
          <p><Link to="/login" className="underline">Entre</Link> ou <Link to="/register" className="underline">cadastre-se.</Link></p>
        )}
        
        <p className="text-green-700 font-semibold">Loja aberta</p>
      </div>
    </header>
  );
};

export default Header;
