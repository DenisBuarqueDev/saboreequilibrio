import { db } from "../../firebase/conection";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaPix } from "react-icons/fa6";
import { FaCreditCard, FaEdit, FaMoneyBillAlt } from "react-icons/fa";
import { useAuthValue } from "../../context/AuthContext";
import { useAuthentication } from "../../authentication/useAuthentication";

const index = () => {
  const { user } = useAuthValue();
  const { auth } = useAuthentication();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState({});

  useEffect(() => {
    setLoading(true);
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCartItems(parsedItems);

      // Soma os preços
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
        const user = auth.currentUser;
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data) {
              setAddress(data);
            }
          }
        }
      };
  
      fetchUsuario();
    }, []);

  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Checkout</h1>

        <div className="flex flex-col gap-2">

          <div className="flex flex-col p-7 rounded border shadow">
            <div className="flex justify-between">
            <strong>Endereço:</strong>
            <Link to="/perfil" className="flex items-center">
            <FaEdit className="mr-1" />
            Alterar</Link>
            </div>
            <p>{address.street + ", " + address.number + ", " + address.district + ", " + address.zipCode + ", " + address.complement + ", Maceió - Alagoas"}</p>
          </div>

          <div className="flex flex-col p-7 rounded border shadow bg-gray-100">
            <strong>Itens do seu pedido:</strong>
            <ul className="mb-2">
              {cartItems &&
                cartItems.map((item) => (
                  <li className="flex justify-between">
                    <p>{item.qtd + " " + item.title}</p>
                    <p>R$ {item.subtotal.toFixed(2).replace(".", ",")}</p>
                  </li>
                ))}
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
                  <input type="radio" name="payment" /> Pix
                </div>
                <FaPix />
              </li>
              <li className="flex justify-between items-center border p-1 mb-1">
                <div>
                  <input type="radio" name="payment" /> Cartão de Crédito
                </div>
                <FaCreditCard />
              </li>
              <li className="flex justify-between items-center border p-1">
                <div>
                  <input type="radio" name="payment" /> Dinheiro
                </div>
                <FaMoneyBillAlt />
              </li>
            </ul>
            <button
              type="buttom"
              to="/"
              className="block items-center text-white w-full bg-green-700 mt-5 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center"
            >
              Realizar Pagamento
            </button>
          </div>

        </div>
      </section>
    </main>
  );
};

export default index;
