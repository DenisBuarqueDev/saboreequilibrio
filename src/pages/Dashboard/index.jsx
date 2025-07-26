import React from "react";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/conection";
import { useAuthentication } from "../../authentication/useAuthentication";
import { FaMapMarkerAlt } from "react-icons/fa";

const index = () => {
  const { auth } = useAuthentication();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca os pedidos do usuário atual
  useEffect(() => {
    const fetchOrders = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = query(
          collection(db, "orders"),
          where("user_id", "==", user.uid)
        );
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
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;

  if (orders.length === 0) return <p>Você ainda não fez pedidos.</p>;

  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Pedidos</h1>
        {orders.map((order) => (
          <article
            key={order.id}
            className="flex flex-col p-3 rounded border shadow mb-2"
          >
            <div className="flex justify-between items-center">
              <p className="text-sm bg-orange-500 text-white px-3 rounded-full">
                {order.status_order}
              </p>
              <p className="text-sm">
                {order.created_at.toDate().toLocaleString("pt-BR")}
              </p>
            </div>
            <ul className="my-2">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center justify-between">
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
            <p className="text-sm flex items-center mt-2">
              <FaMapMarkerAlt className="mr-2" />
              {order.address}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default index;
