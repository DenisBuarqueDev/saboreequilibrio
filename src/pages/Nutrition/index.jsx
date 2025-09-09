import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const index = () => {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState(null);

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    restrictions: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setLoading(true);
      const res = await api.post(`/api/nutrition`, { formData });
      setRecommendation(res.data.recommendation);
    } catch (err) {
      console.error("Erro ao carregar recomendação:", err);
    } finally {
      setLoading(false);
    }
  };

  // Manipula mudanças nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) <p>Carregando...</p>;

  return (
    <main className="flex flex-col w-full my-4 p-2">
      <div className="py-2 mx-auto w-full text-center lg:py-2">
        <Link
          to="/nutrition"
          className="inline-flex justify-between items-center py-1 px-1 pe-4 mb-2 text-sm text-green-700 bg-blue-100 rounded-full dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800"
        >
          <span className="text-xs bg-green-600 rounded-full text-white px-4 py-1.5 me-3">
            Recomendações
          </span>{" "}
          <span class="text-sm font-medium">Nutricionista Digital</span>
          <svg
            className="w-2.5 h-2.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </Link>
        <h1 className="mb-4 px-3 text-4xl font-extrabold text-green-700 tracking-tight leading-none md:text-5xl dark:text-white">
          Avaliação Nutricional
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Informe seus dados para receber uma avaliação nutricional de nossa
          inteligencia artificinal.
        </p>
      </div>

      <div className="mb-4 px-3 text-center">
        {recommendation && <p>recommendation</p>}
      </div>

      <div className="w-full max-w-sm mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-1 bg-white rounded px-8 pb-8"
        >
          <div className="">
            <label
              for="age"
              className="block text-sm font-medium text-gray-900 dark:text-white"
            >
              Idade:
            </label>
            <input
              value={formData.age}
              onChange={handleChange}
              type="number"
              id="age"
              name="age"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Ex: 35"
              required
              maxLength={3}
            />
          </div>
          <div className="">
            <label
              for="weight"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Peso (kg):
            </label>
            <input
              value={formData.weight}
              onChange={handleChange}
              type="number"
              id="weight"
              name="weight"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              placeholder="Ex: 90.5"
              maxLength={5}
            />
          </div>
          <div className="">
            <label
              for="height"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Altura:
            </label>
            <input
              value={formData.height}
              onChange={handleChange}
              type="number"
              id="height"
              name="height"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-bgreenlue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              placeholder="Ex: 1.80"
              maxLength={5}
            />
          </div>
          <div className="">
            <label
              for="goal"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Objetivos:
            </label>
            <input
              value={formData.goal}
              onChange={handleChange}
              type="text"
              id="goal"
              name="goal"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              placeholder="Ex: Emagrecer, Ganhar Massa, Manter peso..."
              maxLength={50}
            />
          </div>
          <div className="pb-2">
            <label
              for="restrictions"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Restrições Alimentares:
            </label>
            <input
              value={formData.restrictions}
              onChange={handleChange}
              type="text"
              id="restrictions"
              name="restrictions"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              required
              placeholder="Ex: Diabetes, Hipertensão, Intolerância à lactose..."
              maxLength={50}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Receber Avaliação
          </button>
        </form>
      </div>
    </main>
  );
};

export default index;
