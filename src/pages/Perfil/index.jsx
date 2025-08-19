import React, { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { MdAddAPhoto, MdNoPhotography } from "react-icons/md";
import { FaEdit, FaMapMarkerAlt, FaPlus, FaUserCircle } from "react-icons/fa";

const index = () => {
  const { user } = useAuthValue();
  const [data, setData] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/addresses/user/${user.id}`);
      setAddresses(res.data.data || []);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchUser();
      fetchAddresses();
    }
  }, [user.id]);

  if (loading) {
    return (
      <div
        role="status"
        className="max-w-screen-md w-full m-auto animate-pulse"
      >
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
        <div className="flex items-center justify-between border-b py-2 mb-1">
          <h2 className="flex items-center text-md font-medium">
            <FaMapMarkerAlt className="mr-2" />
            Endereço
          </h2>
          {addresses && addresses.length === 0 && (
            <Link to="/address/create">
              <FaPlus />
            </Link>
          )}
        </div>

        {error && (
          <div
            className="p-4 text-sm border border-red-300 text-red-800 rounded-lg bg-red-50 mt-2 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        )}

        {addresses && (
          <ul>
            {addresses.map((address, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <p>
                  {address.street}, {address.number}, {address.district},{" "}
                  {address.zipCode}, {address.city} - {address.state},{" "}
                  {address.complement}
                </p>
                <Link to={`/address/edit/${address._id}`}>
                  <FaEdit />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default index;
