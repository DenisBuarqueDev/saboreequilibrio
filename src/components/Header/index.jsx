import React, { useState } from "react";
import { Link } from "react-router-dom";
import ToogleMenu from "../../components/ToggleMenu";

import { useAuthValue } from "../../context/AuthContextProvider";

const index = () => {
  const { user, logout } = useAuthValue();

  const getSaudacao = () => {
    const hora = new Date().getHours();

    if (hora >= 10 && hora < 18) {
      return "Loja aberta.";
    } else {
      return "Loja fechada";
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header>
      <nav className="bg-white dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-2 py-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-bold text-green-700 whitespace-nowrap dark:text-white">
              Sabor e Equilíbrio
            </span>
          </Link>

          <ToogleMenu user={user} handleLogout={handleLogout} />
        </div>
      </nav>

      <div className="flex items-center justify-between p-2 max-w-screen-xl m-auto">
        {user ? (
            <p>
              Bem-vindo(a),{" "}
              <span className="font-semibold">
                {user.firstName ?? user.name}
              </span>
            </p>
        ) : (
          <p className="flex items-center">
            <Link to="/login" className="underline mr-1">
              Entre
            </Link>
            ou
            <Link to="/register" className="underline ml-1">
              Cadastre-se
            </Link>
          </p>
        )}
        <p className="mr-2">{getSaudacao()}</p>
      </div>
    </header>
  );
};

export default index;
