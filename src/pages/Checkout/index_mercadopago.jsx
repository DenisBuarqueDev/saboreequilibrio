import React, { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { SiMercadopago } from "react-icons/si";
import AddressProfile from "../../components/UserProfile/Address";
import api from "../../api/axios";
import { toast } from "react-toastify";

const index = () => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState("pix");
  const [address, setAddress] = useState({});

  const navigate = useNavigate();
  const { user } = useAuthValue();
  const userId = user.id;

  // Carrega o carrinho e calcula o total ao montar
  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCart(parsedItems);

      const totalValue = parsedItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
      setAmount(totalValue);
    }
    setLoading(false);
  }, []);

  // Busca o endereço do usuário
  const fetchUserAddresses = async (userId) => {
    setLoading(true);
    try {
      const response = await api.get(`api/addresses/user/${userId}`);
      const userAddress = response.data.data[0];
      setAddress(userAddress);
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
      //toast.error("Não foi possível carregar o endereço do usuário.");
    } finally {
      setLoading(false);
    }
  };

  // Executa a busca do endereço ao obter userId
  useEffect(() => {
    if (userId) fetchUserAddresses(userId);
  }, [userId]);

  const mercadoPagoPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepara os itens no formato que o backend espera
      const items = cart.map((item) => ({
        title: item.title,
        unit_price: Number(item.price),
        quantity: item.qtd || 1,
        currency_id: "BRL",
      }));

      const body = {
        userId,
        items,
      };

      const response = await api.post(
        "api/mercado-pago/create-preference",
        body
      );

      const preferenceId = response.data.id;

      if (!preferenceId) {
        toast.error("Erro ao iniciar pagamento.");
        return;
      }

      // Inicializa o Mercado Pago com a Public Key
      const mp = new window.MercadoPago("TEST-c818df67-49e4-4292-ba45-a30f801c4bae", {
        locale: "pt-BR",
      });

      // Redireciona para o checkout
      mp.checkout({
        preference: {
          id: preferenceId,
        },
        autoOpen: true, // Abre automaticamente o checkout
      });

    } catch (error) {
      console.error("Erro ao iniciar pagamento:", error);
      toast.error("Erro ao iniciar pagamento.");
    } finally {
      setLoading(false);
    }
  };

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
    <main className="flex flex-col w-full p-4 bg-gray-50 md:py-4">
      <section className="max-w-screen-md w-full flex flex-col mx-auto">
        <h1 className="flex items-center text-2xl font-bold">Checkout</h1>

        {user ? (
          <AddressProfile userId={user.id} />
        ) : (
          <div
            id="alert-additional-content-2"
            className="p-4 mb-2 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert"
          >
            <div className="flex items-center">
              <svg
                className="shrink-0 w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <h3 className="text-lg font-medium">Endereço</h3>
            </div>
            <div className="mt-2 mb-4 text-sm">
              Você não possui um endereço para entrega!
            </div>
            <div className="flex">
              <Link
                to="/perfil"
                className="text-white bg-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Adicionar endereço
              </Link>
            </div>
          </div>
        )}

        <div className="flex flex-col w-full border p-4 shadow rounded my-2 bg-white">
          <strong className="flex items-center text-lg font-medium">
            Itens do seu pedido
          </strong>
          {cart &&
            cart.map((item, index) => (
              <div key={index} className="flex flex-col w-full justify-between">
                <p>{item.title}</p>
                <div className="flex items-center justify-between">
                  <small className="text-gray-600">
                    {item.qtd} x R$ {item.price.toFixed(2).replace(".", ",")}{" "}
                    uni.
                  </small>
                  <small className="text-gray-600">
                    R$ {item.subtotal.toFixed(2).replace(".", ",")}
                  </small>
                </div>
              </div>
            ))}
        </div>

        {amount && (
          <div className="flex items-center justify-between pt-4">
            <div className="flex flex-col">
              <p className="text-xl font-bold">
                R$ {amount.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm">Entrega R$ 0,00</p>
            </div>
            <button
              onClick={mercadoPagoPayment}
              className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Pagamento R$ {amount.toFixed(2).replace(".", ",")}{" "}
              <SiMercadopago className="ml-2 text-white w-6 h-6" />
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default index;
