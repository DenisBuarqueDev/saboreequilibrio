import { db } from "../../firebase/conection";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaPix } from "react-icons/fa6";
import { FaCreditCard, FaEdit, FaMoneyBillAlt } from "react-icons/fa";
import { useAuthentication } from "../../authentication/useAuthentication";
//import { useAuthValue } from "../context/AuthContext";

const index = () => {
  const { auth } = useAuthentication();
  //const { user } = useAuthValue();

  const [payment, setPayment] = useState(null);

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState(null);
  const [hasAddress, setHasAddress] = useState(false);

  // Carrega os itens do localStorage ao montar o componente
  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);
    }
    setLoading(false);
  }, []);

  // Recalcula o total sempre que cartItems mudar
  useEffect(() => {
    const totalValue = cartItems.reduce((acc, item) => acc + item.subtotal, 0);
    setTotal(totalValue);
  }, [cartItems]);

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
            console.log("Documento do usuário não encontrado.");
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

  if (loading) return <p>Carregando...</p>;

  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Checkout</h1>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-3 rounded border shadow">
            <div className="flex justify-between">
              <strong>Endereço:</strong>
              <Link
                to="/perfil"
                className="flex items-center text-gray-400 underline"
              >
                <FaEdit className="mr-1" />
                Alterar
              </Link>
            </div>

            {hasAddress ? (
              <div>
                <p>
                  {address.street}, {address.number}, {address.district},
                  {address.zipCode}, {address.complement}, Maceió - Alagoas
                </p>
              </div>
            ) : (
              <p>Você ainda não cadastrou um endereço.</p>
            )}
          </div>

          <div className="flex flex-col p-3 rounded border shadow bg-gray-100">
            <strong>Itens do seu pedido:</strong>
            <ul className="mb-2">
              {loading ? (
                <p>Aguarde...</p>
              ) : (
                cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <p className="text-sm">{item.qtd + " " + item.title}</p>
                    <p className="text-sm">R$ {item.subtotal.toFixed(2).replace(".", ",")}</p>
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
                <p>R$ 5,00</p>
              </li>
            </ul>
            <hr />
            <ul className="my-5">
              <li className="flex justify-between">
                <p>Total</p>
                <strong>R$ {(5 + total).toFixed(2).replace(".", ",")}</strong>
              </li>
            </ul>
            <strong className="mb-2">Forma de Pagamento:</strong>

            <ul>
              <li className="flex justify-between items-center border p-1 mb-1">
                <div>
                  <input type="radio" name="payment" value="pix" /> Pix
                </div>
                <FaPix className="text-green-400" />
              </li>
              <li className="flex justify-between items-center border p-1 mb-1">
                <div>
                  <input type="radio" name="payment" value="credcard" /> Cartão de Crédito
                </div>
                <FaCreditCard className="text-red-800" />
              </li>
              <li className="flex justify-between items-center border p-1">
                <div>
                  <input type="radio" name="payment" value="money" /> Dinheiro
                </div>
                <FaMoneyBillAlt className="text-green-700" />
              </li>
            </ul>
            {hasAddress ? (
              <button
                type="buttom"
                to="/"
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
          </div>
        </div>
      </section>
    </main>
  );
};

export default index;
