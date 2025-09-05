import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
import Loading from "../Loading";

const index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // 1. Função para buscar todos os produtos
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/products`);
      setProducts(res.data.data);
    } catch (error) {
      console.error("Erro ao buscar products:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Carrega todos os produtos no início
  useEffect(() => {
    fetchProducts();
  }, []);

  // 3. Filtra produtos ao digitar
  useEffect(() => {
    if (search.trim() !== "") {
      fetchProductsByDescription(search);
    } else {
      fetchProducts(); // CORREÇÃO AQUI
    }
  }, [search]);

  // 4. Função para filtrar por descrição
  const fetchProductsByDescription = async (q) => {
    try {
      const response = await api.get(
        `/api/products/search?q=${encodeURIComponent(q)}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Oferecemos opções práticas e nutritivas, feitas com ingredientes
          selecionados para cuidar do seu corpo e da sua mente.
        </p>
        <form className="w-full max-w-md mx-auto">
          <div className="">
            <input
              type="search"
              className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Digite o ingrediente que deseja."
              required
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8">
        {products &&
          products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm md:mb-0"
            >
              <div>
                <Link to={`/show/${product._id}`}>
                  <div
                    style={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderTopLeftRadius: "8px",
                      borderTopRightRadius: "8px",
                      width: "100%",
                      height: "200px",
                    }}
                  ></div>
                </Link>
                <div className="p-2 text-left">
                  <small className="text-gray-500">
                    {product.categoryId?.title}
                  </small>
                  <Link to={`/show/${product._id}`}>
                    <h5 className="text-md font-bold tracking-tight text-green-700 sm:text-xl">
                      {product.title}
                    </h5>
                  </Link>
                  <p className="font-normal text-gray-700 text-sm leading-normal">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col text-orange-600 font-bold sm:flex-row sm:justify-between px-2 pb-2 text-left">
                <h3>R$ {product.price.toFixed(2).replace(".", ",")}</h3>

                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg
                    className="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default index;
