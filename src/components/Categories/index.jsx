import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";

const index = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setLoading(true);
      try {
        if (isMounted) {
          const res = await api.get("/api/categories");
          setCategories(res.data.data);
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
      <div className="py-2 mx-auto w-full text-center lg:py-2">
        <Link to="/nutrition" class="inline-flex justify-between items-center py-1 px-1 pe-4 mb-2 text-sm text-green-700 bg-blue-100 rounded-full dark:bg-green-900 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800">
            <span class="text-xs bg-green-600 rounded-full text-white px-4 py-1.5 me-3">Recomendações</span> <span class="text-sm font-medium">Nutricionista Digital</span> 
            <svg class="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
        </Link>
        <h1 className="mb-4 px-3 text-4xl font-extrabold text-green-700 tracking-tight leading-none md:text-5xl dark:text-white">
          Alimente-se bem, todos os dias.
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Saladas feitas na hora, acomapnhas de diversos tipos de carnes.
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
