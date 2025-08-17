import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";

const index = ({ id }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("api/orders/user");
      setOrders(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("ID do usuário não fornecido.");
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [id]);

  if (loading) {
    return (
      <div
        role="status"
        className="space-y-8 animate-pulse my-9 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
      >
        <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-sm sm:w-96 dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
        <div className="w-full">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {orders && orders.length === 0 ? (
        <div className="text-center w-full">
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
          >
            Fazer um Pedido
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3 md:gap-4">
          {orders && orders.map((order) => (
            <div
              key={order._id}
              className="flex flex-col w-full space-y-1 border p-2 shadow rounded mb-2 bg-white"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-[12px] bg-orange-400 px-2 py-1 text-white rounded-full mr-2">
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                  <span className="text-sm">
                    {new Date(order.createdAt).toLocaleString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      //second: "2-digit",
                      timeZone: "America/Sao_Paulo",
                    })}
                  </span>
                </div>
                <div>
                  <span className="flex items-center text-sm font-semibold">
                    <FaClockRotateLeft className="mr-2" />
                    {(() => {
                      const date = new Date(order.createdAt);
                      date.setMinutes(date.getMinutes() + 50); // Adiciona 50 minutos
                      // Extrai a hora formatada (em fuso horário local, ex: Brasília)
                      const hour = date.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                        timeZone: "America/Sao_Paulo",
                      });

                      return hour;
                    })()}
                  </span>
                </div>
              </div>

              <div>
                <ul>
                  {order.items && order.items.length > 0 ? (
                    <ul className="">
                      {order.items.map((item) => (
                        <li
                          key={item._id}
                          className="flex items-center justify-between border-b text-gray-600"
                        >
                          <small className="font-semibold">
                            {item.qtd} - {item.title}
                          </small>
                          <small>
                            R$ {item.subtotal.toFixed(2).replace(".", ",")}
                          </small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      Nenhum item encontrado para este pedido.
                    </p>
                  )}
                </ul>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Pagamento:{" "}
                    {order.payment.charAt(0).toUpperCase() +
                      order.payment.slice(1)}
                  </span>
                  <span className="text-sm font-semibold">
                    R$ {order.amount.toFixed(2).replace(".", ",")}
                  </span>
                </div>

                <small>Delivery R$ 0,00</small>
              </div>

              <div>
                <span className="flex items-center text-sm">
                  <FaMapMarkerAlt className="mr-2" />
                  {order.address && (
                    <>
                      {order.address.street}, {order.address.number},{" "}
                      {order.address.district}, {order.address.zipCode},{" "}
                      {order.address.city} -{order.address.state},{" "}
                      {order.address.complement}
                    </>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default index;
