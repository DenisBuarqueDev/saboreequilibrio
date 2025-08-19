import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import UserForm from "../../../components/UserProfile/UserForm";

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/addresses/${id}`, {
          withCredentials: true,
        });
        setAddress(response.data.data);
      } catch (err) {
        toast.error(err.response.data.error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [id]);

  // Manipula o envio do formulário
  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      // Envia a requisição para o endpoint de criação de endereço
      const response = await api.put(`/api/addresses/${id}`, data, {
        withCredentials: true,
      });
      toast.success("Endereço atualizado!");
      navigate("/perfil");
    } catch (err) {
      toast.error(err.response.data.error);
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
      <section className="max-w-screen-sm w-full mx-auto p-2">
        <h1 className="text-xl font-semibold mb-2">Endereço Localização</h1>
        <p className="mb-2 text-gray-400 text-sm">
          Ao cadastrar seu endereço, você estará assumindo um compromisso com a
          nossa empresa e com a veracidade das informações fornecidas.
          Lembre-se: o uso de dados pessoais falsos ou de terceiros sem
          autorização é crime, conforme previsto na legislação brasileira.
          Preencha seus dados corretamente para garantir a entrega do seu pedido
          com eficiência em nossa plataforma.
        </p>

        <UserForm initialData={address} onSubmit={handleUpdate} />
      </section>
    </main>
  );
};

export default index;
