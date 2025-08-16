import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const index = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      try {
        if (isMounted) {
          const res = await api.get("api/categories");
          setCategories(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();

    return () => {
      isMounted = false; // ⚠️ Cleanup: marca como desmontado
    };
  }, []);

  if (loading) {
    return (
      <div role="status" className="animate-pulse my-9">
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
        <div className="h-2.5 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
        <div className="flex items-center justify-center mt-4">
          <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
          <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 me-3"></div>
          <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-4 mx-auto w-full text-center lg:py-8">
        <h1 className="mb-4 px-3 text-4xl font-extrabold text-green-700 tracking-tight leading-none md:text-5xl dark:text-white">
          Alimente-se bem, todos os dias.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Saladas feitas na hora, acomapnhas de diversos tipos de carnes,
          descubra como é simples transformar sua alimentação em prazer.
        </p>
        <div className="w-full flex flex-wrap items-center justify-center">
          {categories &&
            categories.map((category) => (
              <div key={category._id} className="p-1">
                <Link
                  to={`/type/${category._id}`}
                  className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-full bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900"
                >
                  {category.title}
                </Link>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default index;
