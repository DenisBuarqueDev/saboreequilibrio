import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSave, FaTrash } from "react-icons/fa";

const UserForm = ({ initialData = {}, onSubmit }) => {
  const [isChecked, setIsChecked] = useState(false);

  const [form, setForm] = useState({
    zipCode: "",
    street: "",
    number: "",
    district: "",
    complement: "",
    city: "Maceió",
    state: "AL",
  });

  // Preenche os campos quando receber initialData (edição)
  useEffect(() => {
    if (initialData) {
      setForm({
        zipCode: initialData.zipCode || "",
        street: initialData.street || "",
        number: initialData.number || "",
        district: initialData.district || "",
        complement: initialData.complement || "",
        city: initialData.city || "",
        state: initialData.state || "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form); // envia para a função passada pelo pai
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <div className="">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            CEP
          </label>
          <input
            value={form.zipCode}
            onChange={handleChange}
            name="zipCode"
            type="text"
            maxLength={9}
            required
            placeholder="Ex: 57000-000"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
        <div className="">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Endereço
          </label>
          <input
            value={form.street}
            onChange={handleChange}
            name="street"
            type="text"
            maxLength={100}
            required
            placeholder="Ex: seunome@gmail.com"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-3">
        <div className="">
          <label
            htmlFor="number"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Número
          </label>
          <input
            value={form.number}
            onChange={handleChange}
            name="number"
            type="text"
            maxLength={5}
            required
            placeholder="nº"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
        <div className="">
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Bairro
          </label>
          <input
            value={form.district}
            onChange={handleChange}
            name="district"
            type="text"
            maxLength={50}
            required
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3">
        <div className="">
          <label
            htmlFor="complement"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Complemento
          </label>
          <input
            value={form.complement}
            onChange={handleChange}
            name="complement"
            type="text"
            maxLength={100}
            placeholder="Opcional"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
        <div className="">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Cidade
          </label>
          <input
            value={form.city}
            onChange={handleChange}
            name="city"
            type="text"
            maxLength={50}
            readOnly
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          />
        </div>
        <div className="">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-900 dark:text-white"
          >
            Estado
          </label>
          <input
            value={form.state}
            onChange={handleChange}
            name="state"
            type="text"
            maxLength={2}
            readOnly
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
      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={!isChecked}
          className={`flex items-center text-white ${
            isChecked
              ? "bg-green-700 hover:bg-green-800 cursor-pointer"
              : "bg-gray-500 hover:bg-gray-500"
          } focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`}
        >
          <FaSave className="mr-2 w-3 h-3" /> Salvar Endereço
        </button>
        <Link
          to="/perfil"
          className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          <FaTrash />
          Cancelar
        </Link>
      </div>
    </form>
  );
};

export default UserForm;
