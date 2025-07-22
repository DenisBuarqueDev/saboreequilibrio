import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";

const Login = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form className="max-w-sm mx-auto border rounded-md shadow-sm p-8">
        <h1 className="flex items-center text-xl font-semibold text-green-700">
          <Link to="/">
            <FaArrowLeft className="mr-3" />
          </Link>
          Log In
        </h1>
        <p className="mb-2">Conecte-se a nossa plataforma.</p>
        <div className="mb-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-900"
          >
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-900">
            Senha:
          </label>
          <input
            type="password"
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="**********"
            required
          />
        </div>

        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300"
              required
            />
          </div>
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900">
            Concordo com os{" "}
            <Link href="#" className="text-green-600 hover:underline">
              termos e condições.
            </Link>
          </label>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Acessar
          <FaArrowRightToBracket className="ml-2 w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default Login;
