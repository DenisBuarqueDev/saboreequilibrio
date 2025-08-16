import React, { useEffect, useState } from "react";
import { useAuthValue } from "../../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { SiMercadopago } from "react-icons/si";
import AddressProfile from "../../components/UserProfile/AddressProfile";
import api from "../../api/axios";
import { toast } from "react-toastify";

const index = () => {
  const [cart, setCart] = useState([]);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState("pix");
  const [address, setAddress] = useState({});

  const navigate = useNavigate();
  const { user } = useAuthValue();
  const userId = user.id;

  // Carrega o carrinho e calcula o total ao montar
  useEffect(() => {
    setLoading(true);
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

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        subtotal: item.subtotal,
        qtd: item.qtd,
        image: item.image,
      }));

      const response = await api.post("api/orders", {
        address: {
          street: address.street,
          number: address.number,
          district: address.district,
          city: address.city,
          state: address.state,
          zipCode: address.zipCode,
          complement: address.complement,
        },
        payment: "pix",
        items: orderItems,
      });

      toast.success("Seu pedido foi enviado e será preparado!");
      localStorage.removeItem("cart");
      navigate("/orders");
    } catch (err) {
      const status = err.response?.status;
      const errorMessage = err.response?.data?.error || "Erro ao criar pedido.";
      if (status === 401) {
        toast.warning("Sessão expirada. Faça login novamente.");
        navigate("/login");
      } else {
        console.log("Erro ao criar pedido:", errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        role="status"
        className="max-w-screen-md w-full m-auto space-y-8 animate-pulse my-9 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
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
    );
  }

  return (
    <main className="flex flex-col w-full p-4 md:py-4">
      <section className="max-w-screen-md w-full flex flex-col mx-auto">
        <h1 className="flex items-center text-2xl font-bold text-green-700">Checkout</h1>
        <div className="flex flex-col w-full border p-3 shadow rounded my-2 bg-white">
          {cart &&
            cart.map((item, index) => (
              <div key={index} className="flex flex-col w-full justify-between">
                <p className="font-semibold">
                  {item.qtd} - {item.title}
                </p>
                <div className="flex items-center justify-between">
                  <small className="text-gray-600">
                    R$ {item.price.toFixed(2).replace(".", ",")} uni.
                  </small>
                  <small className="text-gray-600">
                    R$ {item.subtotal.toFixed(2).replace(".", ",")}
                  </small>
                </div>
              </div>
            ))}
        </div>

        <AddressProfile userId={user.id} />

        {amount && (
          <div className="flex items-center justify-between pt-2">
            <div className="flex flex-col">
              <p className="text-xl font-bold">
                R$ {amount.toFixed(2).replace(".", ",")}
              </p>
              <p className="text-sm">Entrega R$ 0,00</p>
            </div>

            {Object.keys(address).length === 0 ? (
              <button
                disabled
                type="button"
                className="flex items-center text-white bg-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              >
                Pagamento R$ {amount.toFixed(2).replace(".", ",")}{" "}
                <SiMercadopago className="ml-2 text-white w-6 h-6" />
              </button>
            ) : (
              <button
                onClick={handlePayment}
                className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Pagamento R$ {amount.toFixed(2).replace(".", ",")}{" "}
                <SiMercadopago className="ml-2 text-white w-6 h-6" />
              </button>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default index;
