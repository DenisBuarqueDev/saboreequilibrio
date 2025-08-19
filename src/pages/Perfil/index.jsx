import React, { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { MdAddAPhoto, MdNoPhotography } from "react-icons/md";
import { FaEdit, FaMapMarkerAlt, FaPlus, FaUserCircle } from "react-icons/fa";

const index = () => {
  const { user } = useAuthValue();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/auth/${user.id}`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchUser();
    }
  }, [user.id]);

  if (loading) {
    return (
      <div role="status" className="max-w-screen-md w-full m-auto animate-pulse">
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
    <main className="flex flex-col w-full p-4 md:py-4">
      <section className="max-w-screen-md w-full flex flex-col mx-auto">
        {data && (
          <>
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-end">
                {data.image ? (
                  <img
                    className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                    src={`${import.meta.env.VITE_API_URL}${data.image}`}
                    alt="Foto"
                  />
                ) : (
                  <div className="flex items-center justify-center w-32 h-32 text-white text-sm rounded-full bg-gray-400">
                    <MdNoPhotography />
                  </div>
                )}
                <Link to={`/photo/${data._id}`} className="p-2">
                  <MdAddAPhoto className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="flex flex-col flex-1 py-4">
              <h2 className="flex items-center gap-2 text-md font-medium pb-2 border-b">
                <FaUserCircle />
                Perfil
              </h2>
              <p className="text-sm">Nome: {data.firstName}</p>
              <p className="text-sm">Sobrenome: {data.lastName}</p>
              <p className="text-sm">Telefone: {data.phone}</p>
              <p className="text-sm">E-mail: {data.email}</p>
            </div>
          </>
        )}
      </section>
      <section className="max-w-screen-md w-full flex flex-col mx-auto">
        Endereço
        
      </section>
    </main>
  );
};

export default index;
