import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaTrashAlt } from "react-icons/fa";

const index = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Carrega os itens do localStorage ao montar o componente
  useEffect(() => {
    setLoading(true);
    const storedItems = localStorage.getItem("cart");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      setCart(parsedItems);

      // Já calcula o total aqui
      const totalValue = parsedItems.reduce(
        (acc, item) => acc + item.subtotal,
        0
      );
      setTotal(totalValue);
    }
    setLoading(false);
  }, []);

  // remove o item do localStorage
  const removeItem = (id) => {
    const updatedItems = cart.filter((item) => item.title !== id);
    setCart(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  // Recalcula o total sempre que cartItems mudar (ex: após remoção)
  useEffect(() => {
    if (cart.length > 0) {
      const totalValue = cart.reduce((acc, item) => acc + item.subtotal, 0);
      setTotal(totalValue);
    } else {
      setTotal(0);
    }
  }, [cart]);

  if (loading) {
    return (
      <div
        role="status"
        className="max-w-screen-md w-full flex flex-col mx-auto space-y-8 animate-pulse my-9 md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
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
    <main className="flex flex-col w-full p-4 md:py-4">
      <section className="max-w-screen-md w-full flex flex-col mx-auto">
        <h1 className="flex items-center text-2xl text-green-700 font-bold mb-4">
          Cart Shopp
        </h1>

        {cart &&
          cart.map((item, index) => (
            <div
              key={index}
              className="flex w-full border p-1 shadow rounded mb-2 bg-white"
            >
              <div className="flex-none">
                <div
                  style={{
                    backgroundImage: `url(${import.meta.env.VITE_API_URL}${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    width: "100px",
                    height: "100px",
                  }}
                ></div>
              </div>
              <div className="flex flex-col justify-between flex-1 p-3">
                <Link
                  to={`/show/${item._id}`}
                  className="text-lg font-semibold mb-2 hover:underline"
                >
                  {item.title}
                </Link>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    {item.qtd} x R$ {item.price.toFixed(2).replace(".", ",")}{" "}
                    uni.
                  </p>
                  <p className="text-sm text-gray-600">
                    R$ {item.subtotal.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
              <div className="flex-none">
                <button
                  type="button"
                  onClick={() => removeItem(item.title)}
                  className="text-gray-400 p-3"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}

        {total === 0 ? (
          <p>
            Você ainda não possui itens na lista!{" "}
            <Link to="/" className="underline">
              Clique aqui.
            </Link>
          </p>
        ) : (
          <div className="flex items-center justify-between pt-4">
            <p className="text-xl font-bold mb-2">
              R$ {total.toFixed(2).replace(".", ",")}
            </p>
            <Link
              to="/checkout"
              className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Conferir R$ {total.toFixed(2).replace(".", ",")}{" "}
              <FaArrowRight className="ml-2 text-white" />
            </Link>
          </div>
        )}
      </section>
    </main>
  );
};

export default index;
