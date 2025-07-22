import React, { useEffect, useState } from "react";
import { db } from "../../firebase/conection";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import CategoriesComponent from "../../components/CategoriesComponent";

const index = () => {
  const { id } = useParams();

  const [salads, setSalads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSalads = async () => {
      setLoading(true);
      try {
        const postsRef = collection(db, "products");
        const q = query(postsRef, where("category", "==", id));
        const snapshot = await getDocs(q);

        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSalads(lista);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar salads:", error);
      }
    };
    getSalads();

    return () => {};
  }, [id]);

  return (
    <main>
      <CategoriesComponent />

      <section className="bg-white">
        {loading ? (
          <p className="text-center">Carregando dados...</p>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 py-4 px-4 mx-auto max-w-screen-xl text-center">
            {salads &&
              salads.map((salad) => (
                <div key={salad.id} className="flex flex-col justify-between max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm mb-3 md:mb-0">
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
              ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default index;
