import React from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContextProvider";

const index = () => {
  const { user, logout } = useAuthValue();

  const handleLogout = () => {
    logout();
  };

  return (
    <footer className="w-full p-4 bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-col items-center mx-auto py-4 md:flex-row md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2025{" "}
          <Link to="https://flowbite.com/" className="hover:underline">
            Flowbite™
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link to="/" className="hover:underline me-4 md:me-6">
              Home
            </Link>
          </li>

          <li>
            <Link to="/cart" className="hover:underline me-4 md:me-6">
              Cart Shopp
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
                <Link to="/orders" className="hover:underline me-4 md:me-6">
                  Pedidos
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:underline me-4 md:me-6"
                >
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default index;
