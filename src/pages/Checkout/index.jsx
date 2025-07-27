import { db } from "../../firebase/conection";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { FaPix } from "react-icons/fa6";
import {
  FaCreditCard,
  FaEdit,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuthentication } from "../../authentication/useAuthentication";
import GoogleMapComponent from "../../components/GoogleMapComponent";

const index = () => {
  const { auth } = useAuthentication();

  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState(null);
  const [hasAddress, setHasAddress] = useState(false);

  const [error, setError] = useState(null);

  // Carrega os itens do localStorage ao montar o componente
  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);

      // Já calcula o total aqui
      const totalValue = parsedItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
      setTotal(totalValue);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setAddress(data);

            // Verifica se tem endereço
            if (data.street) {
              setHasAddress(true);
            } else {
              setHasAddress(false);
            }
          } else {
            setError("Você não possui um endereço cadastrado.");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  const handleChange = (event) => {
    setPayment(event.target.value);
  };

  const handleCheckout = async (e) => {

    e.preventDefault();

    if (!auth.currentUser) {
      setError("Você precisa estar logado para finalizar o pedido.");
      return;
    }

    if (!payment) {
      setError("Selecione uma forma de pagamento.");
      return;
    }

    if (!hasAddress || !address?.street) {
      setError("Endereço incompleto ou não cadastrado.");
      return;
    }

    try {
      setError(null);
      setLoading(true);

      const user = auth.currentUser;

      // 1. Adiciona ordem principal
      const orderRef = await addDoc(collection(db, "orders"), {
        user_id: user.uid,
        name: user.displayName,
        address: `${address.street}, ${address.number} - ${address.district} - ${address.zipCode}, ${address.complement} - Maceió - Alagoas`,
        type_payment: payment,
        status_order: "Preparando", // status inicial
        subtotal: total,
        created_at: Timestamp.now(),
      });

      // 2. Adiciona os itens do pedido
      const itemsPromises = cartItems.map((item) =>
        addDoc(collection(db, "itens_order"), {
          order_id: orderRef.id,
          title: item.title,
          quantity: item.qtd,
          total: item.subtotal,
        })
      );

      await Promise.all(itemsPromises);

      // 3. Limpa carrinho e localStorage
      setCartItems([]);
      setTotal(0);
      localStorage.removeItem("cart");

      alert("Pedido realizado com sucesso!");

      navigate("/dashboard");

    } catch (err) {
      console.error("Erro ao finalizar pedido:", err);
      setError("Erro ao finalizar o pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Checkout</h1>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-3 rounded border shadow">
            <div className="flex justify-between">
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <strong>Endereço:</strong>
              </div>
              <Link
                to="/perfil"
                className="flex items-center text-sm text-gray-400 underline"
              >
                <FaEdit className="mr-1" />
                Alterar
              </Link>
            </div>

            {hasAddress && (
              <div>
                <p>
                  {address.street}, {address.number}, {address.district},
                  {address.zipCode}, {address.complement}, Maceió - Alagoas
                </p>
              </div>
            )}

            {error && (
              <div
                className="p-2 mt-1 text-sm text-red-800 rounded-lg bg-red-100"
                role="alert"
              >
                <span className="font-medium">Alerta!</span> {error}
              </div>
            )}
          </div>

          <div className="flex flex-col p-3 rounded border shadow bg-gray-100">
            <strong>Itens pedido:</strong>
            <ul className="mb-2">
              {loading ? (
                <p>Aguarde...</p>
              ) : (
                cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <p className="text-sm">{item.qtd + " " + item.title}</p>
                    <p className="text-sm">
                      R$ {item.subtotal.toFixed(2).replace(".", ",")}
                    </p>
                  </li>
                ))
              )}
            </ul>
            <hr />
            <ul className="my-2">
              <li className="flex justify-between">
                <p>SubTotal</p>
                <p>R$ {total.toFixed(2).replace(".", ",")}</p>
              </li>
              <li className="flex justify-between">
                <p>Taxa de entrega</p>
                <p>R$ 0,00</p>
              </li>
            </ul>
            <hr />
            <ul className="my-5">
              <li className="flex justify-between">
                <p>Total</p>
                <strong>R$ {total.toFixed(2).replace(".", ",")}</strong>
              </li>
            </ul>
            <strong className="mb-2">Forma de Pagamento:</strong>
            <form onSubmit={handleCheckout}>
              <ul>
                <li className="flex justify-between items-center border p-1 mb-1">
                  <div>
                    <input
                      type="radio"
                      name="payment"
                      value="pix"
                      checked={payment === "pix"}
                      onChange={handleChange}
                    />{" "}
                    Pix
                  </div>
                  <FaPix className="text-blue-400" />
                </li>
                <li className="flex justify-between items-center border p-1 mb-1">
                  <div>
                    <input
                      type="radio"
                      name="payment"
                      value="credcard"
                      checked={payment === "credcard"}
                      onChange={handleChange}
                    />{" "}
                    Cartão de Crédito
                  </div>
                  <FaCreditCard className="text-red-800" />
                </li>
                <li className="flex justify-between items-center border p-1">
                  <div>
                    <input
                      type="radio"
                      name="payment"
                      value="money"
                      checked={payment === "money"}
                      onChange={handleChange}
                    />{" "}
                    Dinheiro
                  </div>
                  <FaMoneyBillAlt className="text-green-700" />
                </li>
              </ul>
              {hasAddress && total !== 0 ? (
                <button
                  type="buttom"
                  className="block items-center text-white w-full bg-green-700 mt-5 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center"
                >
                  Enviar Pedido
                </button>
              ) : (
                <button
                  disabled
                  type="buttom"
                  className="block items-center text-white w-full bg-gray-500 mt-5 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500 font-medium rounded-full px-5 py-2.5 text-center"
                >
                  Enviar Pedido
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default index;
