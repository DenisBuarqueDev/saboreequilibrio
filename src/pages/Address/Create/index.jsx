import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import UserForm from "../../../components/UserProfile/UserForm";

const index = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Manipula o envio do formulário
  const handleCreate = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/api/addresses", data, {
        withCredentials: true,
      });
      toast.success("Endereço cadastrado!");
      navigate("/perfil");
    } catch (err) {
      setError(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div role="status" class="max-w-sm animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center w-full p-4 mb-10 md:py-4">
      <section className="max-w-screen-md w-full mx-auto p-2">
        <h1 className="text-xl font-semibold mb-2">Endereço Localização</h1>
        <p className="mb-2 text-gray-400 text-sm">
          Ao cadastrar seu endereço, você estará assumindo um compromisso com a
          nossa empresa e com a veracidade das informações fornecidas.
          Lembre-se: o uso de dados pessoais falsos ou de terceiros sem
          autorização é crime, conforme previsto na legislação brasileira.
          Preencha seus dados corretamente para garantir a entrega do seu pedido
          com eficiência em nossa plataforma.
        </p>

        {error && <p>{error}</p>}

        <UserForm onSubmit={handleCreate} />
      </section>
    </main>
  );
};

export default index;
