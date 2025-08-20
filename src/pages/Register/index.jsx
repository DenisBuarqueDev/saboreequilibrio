import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSave, FaTrash } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContextProvider";

const index = () => {

  const navigate = useNavigate();

  const { register, loading, user } = useAuthValue();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isChecked, setIsChecked] = useState(false); // Para aceitar termos, se necessário

  // Manipula mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Redireciona apenas depois do carregamento do estado do usuário
    useEffect(() => {
      if (!loading && user) {
        navigate("/");
      }
    }, [user, loading, navigate]);
  
    // Enquanto está carregando os dados do usuário, mostra feedback
    if (loading) {
      return (
        <main className="flex justify-center items-center h-screen">
          <p>Carregando...</p>
        </main>
      );
    }

  // Manipula envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(formData);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <main className="flex items-center justify-center w-full h-screen p-2 bg-gray-50 md:py-4">
      <section className="max-w-screen-sm w-full mx-auto border bg-white shadow p-6 rounded">
        <h1 className="flex items-center text-2xl font-semibold">
          <Link to="/">
            <FaArrowLeft className="mr-2 w-4 h-4" />
          </Link>
          Nova Conta
        </h1>
        <p className="mb-3 text-gray-400">
          Ao se cadastrar, você estará assumindo um compromisso com a nossa
          empresa e com a veracidade das informações fornecidas. Lembre-se: o
          uso de dados pessoais falsos ou de terceiros sem autorização é crime,
          conforme previsto na legislação brasileira.
        </p>
        <p className="mb-3 text-gray-400 my-3">
          Preencha seus dados corretamente para garantir uma experiência segura
          e eficiente em nossa plataforma.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <div className="">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Nome
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                maxLength={30}
                required
                placeholder="Ex: Marcos"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blgreenue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div className="">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Sobrenome
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                maxLength={30}
                required
                placeholder="Ex: Santos"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>

            <div className="">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Telefone
              </label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="text"
                maxLength={11}
                required
                placeholder="Ex: 82988771122"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                E-Mail
              </label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                maxLength={50}
                required
                placeholder="Ex: seunome@gmail.com"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>

            <div className="">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Senha
              </label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                maxLength={50}
                required
                placeholder="**********"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
            <div className="">
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirme a Senha
              </label>
              <input
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                type="password"
                maxLength={50}
                required
                placeholder="**********"
                id="passwordConfirm"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              />
            </div>
          </div>
          <div className="py-2">
            <input
              id="terms"
              type="checkbox"
              value={isChecked}
              onChange={handleCheckboxChange}
              className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300"
              required
            />{" "}
            Concordo com os termos e condições.
          </div>
          <div className="flex items-center gap-2 justify-between">
            {!loading ? (
              <button
                type="submit"
                disabled={!isChecked}
                className={`flex items-center gap-1 text-white ${
                  isChecked
                    ? "bg-green-700 hover:bg-green-800 cursor-pointer"
                    : "bg-gray-500 hover:bg-gray-500"
                } focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
              >
                <FaSave />
                Criar Conta
              </button>
            ) : (
              <button
                disabled
                type="button"
                className="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Aguarde...
              </button>
            )}
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <FaTrash />
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default index;
