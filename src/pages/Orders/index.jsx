import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaMotorcycle } from "react-icons/fa";
import { io } from "socket.io-client";
import { TbMessage } from "react-icons/tb";
import Chat from "../../components/Chat";

const socket = io(`${import.meta.env.VITE_API_URL}`, {
  transports: ["websocket"], // força usar WebSocket
});

const index = () => {
  const { user } = useAuthValue();

  const [orders, setOrders] = useState([]);
  const [unread, setUnread] = useState({}); // { orderId: count }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [chat, setChat] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(true);

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

  // Atualiza pedidos em tempo real
  useEffect(() => {
    // Esculta a atualização od status do pedido
    socket.on("orderStatusUpdated", (updatedOrder) => {
      setOrders((prev) =>
        prev.map((order) =>
          order._id === updatedOrder._id ? updatedOrder : order
        )
      );
    });

    // escutar notifyUser (quando admin enviar) para badge/alerta
    const onNotifyUser = ({ orderId, message }) => {
      setUnread((prev) => ({
        ...prev,
        [orderId]: (prev[orderId] || 0) + 1,
      }));
      // opcional: você pode mostrar toast/alert
      console.log("Nova mensagem do admim no pedido:", orderId, message);
    };
    socket.on("notifyUser", onNotifyUser);

    return () => {
      socket.off("orderStatusUpdated");
      socket.off("notifyUser", onNotifyUser);
    };
  }, [chat]);

  // Abrir chat → reset contador
  function openModal(orderId) {
    setIsOpen(false);
    setChat(orderId);
    // 🔴 resetar contador ao abrir o chat
    setUnread((prev) => ({
      ...prev,
      [orderId]: 0,
    }));
  }

  function closeModal() {
    setIsOpen(true);
  }

  if (loading) {
    return <p className="text-center">Carregando...</p>;
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
                    className="flex flex-col w-full space-y-3 border p-2 shadow rounded mb-2 bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span
                          className={`text-[12px] 
                            ${order.status === "preparando" && "bg-orange-600"} 
                            ${order.status === "entrega" && "bg-yellow-500"} 
                            ${order.status === "finalizado" && "bg-gray-400"} 
                            ${order.status === "cancelado" && "bg-red-600"} 
                            px-2 py-1 text-white rounded-full mr-2`}
                        >
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
                            timeZone: "America/Sao_Paulo",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 font-semibold">
                          <FaMotorcycle />
                          {(() => {
                            const date = new Date(order.createdAt);
                            date.setMinutes(date.getMinutes() + 50);
                            return date.toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                              timeZone: "America/Sao_Paulo",
                            });
                          })()}
                        </span>

                        <button
                          onClick={() => openModal(order._id)}
                          type="button"
                          className={`relative inline-flex items-center gap-1 px-2 py-1 text-sm text-center text-black border rounded-md shadow-sm hover:bg-gray-100`}
                        >
                          <TbMessage />
                          {unread[order._id] > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                              {unread[order._id]}
                            </span>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Itens do pedido */}
                    <div>
                      {order.items && order.items.length > 0 ? (
                        <ul>
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
                    </div>

                    {/* Total + pagamento */}
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
                        <span className="text-[11px]">
                          {order.address.street}, {order.address.number},{" "}
                          {order.address.district}, {order.address.zipCode},{" "}
                          {order.address.city} - {order.address.state},{" "}
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

      {/* Chat Modal */}
      <div
        className="fixed bottom-0 left-0 right-0 max-w-screen-sm w-full mx-auto p-2 bg-white"
        hidden={modalIsOpen}
      >
        <div className="flex items-center justify-between mb-2 p-2">
          <p className="font-bold">Chat Atendimento:</p>
          <button
            type="button"
            onClick={closeModal}
            className="flex items-center justify-center px-2 rounded-full text-sm text-white bg-red-500"
          >
            X
          </button>
        </div>

        <Chat orderId={chat} userId={user.id} />
      </div>
    </main>
  );
};

export default index;
