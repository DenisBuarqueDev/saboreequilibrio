import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaMotorcycle } from "react-icons/fa";
import { io } from "socket.io-client";

/*const socket = io("http://localhost:5000", {
  transports: ["websocket"], // força usar WebSocket
});*/

const socket = io("https://backend-saboreequilibrio.onrender.com", {
  transports: ["websocket"], // força usar WebSocket
});

const index = () => {
  const { user } = useAuthValue();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/orders/user");
      setOrders(response.data.data);
    } catch (err) {
      setError(err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user.id) {
      setError("ID do usuário não fornecido.");
      setLoading(false);
      return;
    }
    fetchOrders();
  }, [user.id]);

  // Novos pedidos em tempo real
  useEffect(() => {
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, []);


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 w-full m-auto">
        <div
          role="status"
          className="space-y-8 animate-pulse my-9 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
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
        <div
          role="status"
          className="space-y-8 animate-pulse my-9 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
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
        <div
          role="status"
          className="space-y-8 animate-pulse my-9 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
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
      </div>
    );
  }

  return (
    <main className="flex flex-col w-full p-2 md:py-4">
      <section className="max-w-screen-xl w-full flex flex-col mx-auto">
        <h1 className="flex items-center text-green-700 text-2xl font-bold mb-4">
          <FaBell className="mr-2" />
          Pedidos
        </h1>
        <div className="w-full">
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
              {orders &&
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="flex flex-col w-full space-y-1 border p-2 shadow rounded mb-2 bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-[12px] bg-orange-600  px-2 py-1 text-white rounded-full mr-2">
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
                        <span className="flex items-center gap-1 font-semibold">
                          <FaMotorcycle />
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
                                  R${" "}
                                  {item.subtotal.toFixed(2).replace(".", ",")}
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
                      {order.address && (
                        <span className="text-sm">
                          {order.address.street}, {order.address.number},{" "}
                          {order.address.district}, {order.address.zipCode},{" "}
                          {order.address.city} -{order.address.state},{" "}
                          {order.address.complement}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default index;
