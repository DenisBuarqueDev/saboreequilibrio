import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { FaCartArrowDown, FaPlus } from "react-icons/fa";
import { MdOutlineRemove } from "react-icons/md";
import { toast } from "react-toastify";

const index = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Erro ao carregar produto:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increment = () => {
    setQuantity((prev) => (prev < 5 ? prev + 1 : 5));
    return;
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    return;
  };

  const getCart = () => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      toast.error("Erro ao ler carrinho.");
      console.error("Erro ao ler carrinho:", err);
      return [];
    }
  };

  const addToCart = () => {
    try {
      const cart = getCart();

      const exists = cart.find((item) => item.title === product.title);
      if (exists) {
        toast.warning("Produto já foi adicionado ao pedido.");
        return;
      }

      const newItem = {
        productId: product._id,
        title: product.title,
        price: product.price,
        subtotal: quantity * product.price,
        qtd: quantity,
        image: product.image,
      };

      const updatedCart = [...cart, newItem];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      setQuantity(1);
      navigate("/cart");
      toast.success("Produto adicionado ao pedido.");

    } catch (err) {
      toast.error("Erro ao adicionar pedido!");
      console.error("Erro ao adicionar pedido:", err);
    }
  };

  if (loading) {
    return (
      <div
        role="status"
        className="max-w-sm m-auto p-4 border border-gray-200 rounded-sm shadow-sm animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded-sm dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 20"
          >
            <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          </svg>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-center mt-4">
          <svg
            className="w-10 h-10 me-3 text-gray-200 dark:text-gray-700"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
          </svg>
          <div>
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
            <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  
  return (
    <main className="flex flex-col w-full my-4 p-2">
      <section className="max-w-screen-md flex flex-col mx-auto">
        {!product && <p className="text-center py-3 text-green-700">Produto não encontrado</p>}

        {product.image && (
          <img
            src={`${import.meta.env.VITE_API_URL}${product.image}`}
            alt={product.title}
            className="w-full h-auto mb-4 rounded-lg shadow-lg"
          />
        )}
        <h1 className="text-3xl font-bold text-green-700">{product.title}</h1>
        <p className="text-xl text-gray-500">{product.subtitle}</p>
        <p className="text-md my-3 text-gray-500">{product.description}</p>
        <p className="text-md font-semibold text-xl">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>
        <p className="text-md">Categoria: {product.categoryId?.title}</p>

        <div className="w-full flex justify-between mx-auto border-t pt-5 mt-5">
          <div className="flex items-center">
            <button
              onClick={decrement}
              className="bg-green-600 text-white p-4 rounded hover:bg-red-600"
            >
              <MdOutlineRemove />
            </button>
            <input
              type="number"
              name="quantity"
              className="mx-2 w-[40px] px-2 py-3 text-center border rounded"
              readOnly
              value={quantity}
            />
            <button
              onClick={increment}
              className="bg-green-600 text-white p-4 rounded hover:bg-green-800"
            >
              <FaPlus />
            </button>
          </div>

          <button
            onClick={addToCart}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Adicionar R$ {product.price.toFixed(2).replace(".", ",")}{" "}
            <FaCartArrowDown className="ml-2" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default index;
