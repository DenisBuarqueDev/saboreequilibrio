import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import { FaEdit, FaMapMarkerAlt, FaPlus } from "react-icons/fa";

const AddressProfile = ({ id }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Função para buscar os endereços
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await api.get(`api/addresses/user/${id}`);
      setAddresses(res.data.data || []);
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Chama a função ao montar o componente
  useEffect(() => {
    if (id) {
      fetchAddresses();
    }
  }, [id]);

  // Renderização condicional
  if (loading) {
    return (
      <div role="status" className="max-w-md w-full animate-pulse my-3">
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
    <div>
      <div className="flex flex-col mb-2">
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

        {addresses && addresses.length === 0 ? (
          <div
            className="p-4 text-sm border border-red-300 text-red-800 rounded-lg bg-red-50 mt-2 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {error}
          </div>
        ) : (
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
      </div>
    </div>
  );
};

export default AddressProfile;
