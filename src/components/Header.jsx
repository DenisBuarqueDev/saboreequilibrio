import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaArrowLeft, FaHome, FaBell, FaCartPlus, FaUserCircle, FaMapMarkerAlt } from "react-icons/fa";
import { FaArrowRightToBracket, FaArrowRightFromBracket } from "react-icons/fa6";

import { useAuthentication } from "../authentication/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

const Header = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const [isOpen, setIsOpen] = useState(false);

  const getSaudacao = () => {
    const hora = new Date().getHours();

    if (hora >= 10 && hora < 18) {
      return "Loja aberta.";
    } else {
      return "Loja fechada";
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

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
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

          {isOpen && (
            <div
              className="w-full block"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col gap-1 p-2 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white ">
                <li className="flex items-center p-3 border border-gray-200 hover:bg-transparent rounded-md">
                  <FaHome className="mr-3" />
                  <NavLink
                    to="/"
                    className="block text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                  >
                    Início
                  </NavLink>
                </li>
                <li className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-transparent">
                  <FaCartPlus className="mr-3" />
                  <NavLink
                    to="/cart"
                    className="block text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                  >
                    Carrinho
                  </NavLink>
                </li>
                {!user && (
                  <>
                    <li className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-transparent">
                      <FaUserCircle className="mr-3" />
                      <NavLink
                        to="/register"
                        className="block text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                      >
                        Cadastre-se
                      </NavLink>
                    </li>
                    <li className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-transparent">
                      <FaArrowRightToBracket className="mr-3" />
                      <NavLink
                        to="/login"
                        className="block text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                      >
                        Entrar
                      </NavLink>
                    </li>
                  </>
                )}
                {user && (
                  <>
                    <li className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-transparent">
                      <FaMapMarkerAlt className="mr-3" />
                      <NavLink
                        to="/perfil"
                        className="block text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                      >
                        Endereço
                      </NavLink>
                    </li>
                    <li className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-transparent">
                      <FaBell className="mr-3" />
                      <NavLink
                        to="/dashboard"
                        className="block text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                      >
                        Pedidos
                      </NavLink>
                    </li>
                    <li className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-transparent">
                      <buttom
                        onClick={logout}
                        className="block text-gray-900 rounded-sm cursor-pointer hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 md:p-0"
                      >
                        <FaArrowRightFromBracket className="mr-3"/>
                        Sair
                      </buttom>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}

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
                      Endereço
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
          <p>
            Bem-vindo(a) <strong>{user.displayName}</strong>
          </p>
        ) : (
          <p>
            <Link to="/login" className="underline">
              Entre
            </Link>{" "}
            ou{" "}
            <Link to="/register" className="underline">
              cadastre-se.
            </Link>
          </p>
        )}

        <p className="text-green-700 font-semibold">{getSaudacao()}</p>
      </div>
    </header>
  );
};

export default Header;
