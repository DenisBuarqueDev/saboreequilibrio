import React, { useState, useEffect } from "react";
import { useAdminCheck } from "../../authentication/useAdminCheck";
import { Navigate, Link } from "react-router-dom";
import { db } from "../../firebase/conection";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { FaMapMarkerAlt, FaCalendar, FaPrint } from "react-icons/fa";
import { MdDeliveryDining } from "react-icons/md";

const index = () => {
  const [orders, setOrders] = useState([]);
  const [load, setLoad] = useState(true);

  const { isAdmin, loading } = useAdminCheck();

  // Busca os pedidos do usuário atual
  useEffect(() => {
    const fetchOrders = async () => {
      //const user = auth.currentUser;
      //if (!user) return;

      try {
        const q = query(collection(db, "orders"), orderBy("created_at", "asc"));
        const querySnapshot = await getDocs(q);

        const ordersWithItems = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const orderData = { id: docSnap.id, ...docSnap.data() };

            // Busca os itens do pedido
            const itemsQuery = query(
              collection(db, "itens_order"),
              where("order_id", "==", docSnap.id)
            );

            const itemsSnapshot = await getDocs(itemsQuery);
            const items = itemsSnapshot.docs.map((itemDoc) => ({
              id: itemDoc.id,
              ...itemDoc.data(),
            }));

            return { ...orderData, items };
          })
        );

        setOrders(ordersWithItems);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (!isAdmin) return <Navigate to="/" />; // ou para uma página de acesso negado

  if (load) return <p>Carregando...</p>;

  return (
    <main className="bg-white">
      <div className="max-w-screen-xl mx-auto">
        <ul className="flex gap-2 items-center my-3">
          <li>
            <Link to="/dashboard" className="py-2 px-5 border rounded">
              Preparando (0)
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="py-2 px-5 border rounded">
              Entregando (0)
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="py-2 px-5 border rounded">
              Finalizados (0)
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="py-2 px-5 border rounded">
              Cancelados (0)
            </Link>
          </li>
        </ul>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-3">
          {orders &&
            orders.map((order) => (
              <article
                key={order.id}
                className="flex flex-col justify-between p-3 rounded border shadow"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <strong>{order.name}</strong>
                    <div>
                      <select className="border p-1 rounded text-sm mr-2">
                        <option value="preparing">{order.status_order}</option>
                        <option value="delivering">Entregando</option>
                        <option value="completed">Finalizado</option>
                        <option value="canceled">Cancelado</option>
                      </select>
                      <button>
                        <FaPrint />
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="flex items-center text-sm">
                      <FaCalendar className="mr-2" />
                      {order.created_at.toDate().toLocaleString("pt-BR")}
                    </p>

                    <div className="flex items-center gap-2">
                      <MdDeliveryDining className=" text-red-600" />
                      <p className="text-sm text-red-600 font-semibold">
                        {(() => {
                          const date = order.created_at.toDate();
                          date.setMinutes(date.getMinutes() + 50); // adiciona 50 minutos

                          return date.toLocaleTimeString("pt-BR", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          });
                        })()}
                      </p>
                    </div>
                  </div>

                  <ul className="my-2">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between"
                      >
                        <p className="text-sm">
                          {item.quantity} {item.title}
                        </p>
                        <p className="text-sm">
                          R$ {item.total.toFixed(2).replace(".", ",")}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    <li className="flex justify-between items-center">
                      <p className="text-sm">Pagamento {order.type_payment}</p>
                      <p className="text-sm font-bold">
                        R$ {order.subtotal.toFixed(2).replace(".", ",")}
                      </p>
                    </li>
                    <li className="flex justify-between items-center">
                      <p className="text-sm">Taxa entrega</p>
                      <p className="text-sm">R$ 0,00</p>
                    </li>
                  </ul>
                </div>
                <p className="text-sm flex items-center mt-2">
                  <FaMapMarkerAlt className="mr-2" />
                  {order.address}
                </p>
              </article>
            ))}
        </section>
      </div>
    </main>
  );
};

export default index;
