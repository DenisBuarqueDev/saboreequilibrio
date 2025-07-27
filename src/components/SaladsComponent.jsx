import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase/conection";
import { collection, getDocs, query } from "firebase/firestore";

const SaladsComponent = () => {
  const [salads, setSalads] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true; // Flag para checar se o componente ainda está montado

    const getSalads = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (isMounted) {
          setSalads(docs);
          setLoading(false);
        }
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      }
    };

    getSalads();

    return () => {
      isMounted = false; // ⚠️ Cleanup: marca como desmontado
    };
  }, []);

  const listSalads = salads.filter((doc) =>
    // Filtra por um campo específico. Exemplo: nome
    doc.description?.toLowerCase().includes(search.toLowerCase())
  );

  const formatDecimalBR = (value) => {
    if (isNaN(value)) return "0,00";
    return Number(value).toFixed(2).replace(".", ",");
  };

  return (
    <>
      <section className="bg-white mt-4">
        <div className="p-4 mx-auto max-w-screen-xl text-center lg:py-8">
          {/*<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-green-700 md:text-5xl lg:text-6xl">Busque pelo que mais gosta.</h1>*/}
          <p className="hidden mb-8 text-2xl font-semibold text-orange-500 sm:px-16 md:block lg:text-3xl">
            Oferecemos opções práticas, deliciosas e nutritivas, feitas com
            ingredientes selecionados para cuidar do seu corpo e da sua mente.
          </p>
          <form className="w-full max-w-md mx-auto">
            <div className="relative">
              <input
                type="search"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                id="default-email"
                className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-green-500 focus:border-green-500"
                placeholder="Pesquise por: frango"
                required
              />
            </div>
          </form>
        </div>
      </section>

      <section className="bg-white">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 py-4 px-4 mx-auto max-w-screen-xl text-center">
          {loading ? (
            <p>Carregando dados...</p>
          ) : (
            listSalads &&
            listSalads.map((salad) => (
              <div
                key={salad.id}
                className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm md:mb-0"
              >
                <div>
                  <Link to={`/show/${salad.id}`}>
                    <div
                      style={{
                        backgroundImage: `url(${salad.image})`,
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
                    <Link to={`/show/${salad.id}`}>
                      <h5 className="text-md font-bold tracking-tight text-green-700 sm:text-xl">
                        {salad.title}
                      </h5>
                    </Link>
                    <p className="font-normal text-gray-700 text-sm leading-normal">
                      {salad.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col text-orange-600 font-bold sm:flex-row sm:justify-between px-2 pb-2 text-left">
                  <h3>R$ {salad.price.toFixed(2).replace(".", ",")}</h3>

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
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default SaladsComponent;
