import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa";
import { useAuthentication } from "../../authentication/useAuthentication";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  const { login, loading, errorAuth } = useAuthentication();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError("Digite seu e-mail!");
      return;
    }

    if (!password) {
      setError("Digite sua senha!");
      return;
    }

    const user = {
      email,
      password,
    };

    const res = await login(user);
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto border rounded-md shadow-sm p-8"
      >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
            placeholder="name@gmail.com"
            required
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-900"
          >
            Senha:
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              value={isChecked}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900"
          >
            Concordo com os{" "}
            <Link href="#" className="text-green-600 hover:underline">
              termos e condições.
            </Link>
          </label>
        </div>

        {!loading ? (
          <button disabled={!isChecked}
            className={`flex items-center justify-center text-white w-full ${isChecked ? 'bg-green-700 focus:ring-green-300 hover:bg-green-800' : 'bg-gray-400 focus:ring-gray-400 hover:bg-gray-400'} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            Acessar
            <FaArrowRightToBracket className="ml-2 w-4 h-4" />
          </button>
        ) : (
          <button
            disabled
            className="text-white bg-gray-400 hover:bg-gray-400 w-full focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Aguarde...
          </button>
        )}

        {error && (
          <div
            class="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">Alerta!</span> {error}
          </div>
        )}
        {errorAuth && (
          <div
            className="p-4 mt-4 text-sm text-red-800 rounded-lg bg-red-100"
            role="alert"
          >
            <span className="font-medium">Alert!</span> {errorAuth}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
