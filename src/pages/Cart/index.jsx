import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaArrowRight, FaCreditCard } from "react-icons/fa";

const index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.title !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  return (
    <main className="bg-white">
      <div className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">
          Lista de Pedidos
        </h1>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            {cartItems === 0 ? (
              <p>Lista vazia.</p>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex border shadow rounded p-2 mb-2"
                >
                  <div
                    className="flex-none rounded mr-2"
                    style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      width: "100px",
                      height: "100px",
                    }}
                  ></div>
                  <div className="flex flex-1 justify-between">
                    <div className="flex justify-between flex-col w-full">
                      <h2 className="font-semibold">{item.title}</h2>
                      <div className="flex justify-between w-ful">
                        <p>
                          {item.qtd} x {item.price.toFixed(2).replace(".", ",")}
                        </p>
                        <p>
                          Total R$ {item.subtotal.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button
                        onClick={() => removeItem(item.title)}
                        type="button"
                        className="text-gray-600 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </>
        )}

        <div className="flex items-center justify-between border rounded shadow p-2">
          <div className="flex items-center">
            <FaCreditCard className="mr-2 w-5 h-5" />
            {loading ? (
              <p>Carregando...</p>
            ) : (
              <p className="text-xl">R$ {total.toFixed(2).replace(".", ",")}</p>
            )}
          </div>
          <Link
            to="/checkout"
            className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Pagamento R$ {total.toFixed(2).replace(".", ",")}
            <FaArrowRight className="ml-2" />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default index;
