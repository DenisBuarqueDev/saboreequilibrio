import { db } from "../firebase/conection";
import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CategoriesComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag para checar se o componente ainda está montado

    const getDocuments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          setCategories(docs); // Só atualiza se o componente ainda estiver montado
        }
      } catch (error) {
        console.error("Erro ao listar categorias:", error);
      }
    };

    getDocuments();

    return () => {
      isMounted = false; // ⚠️ Cleanup: marca como desmontado
    };
  }, []);

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 8,
    infinite: true,
    autoplay: true,
    lazyLoad: "ondemand",
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          //dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          //dots: true,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          //dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <section className="bg-white">
      <div className="py-2 px-4 mx-auto max-w-screen-xl text-center mb-5">
        <h1 className="mb-4 text-2xl font-semibold tracking-tight leading-none text-orange-500 md:text-3xl lg:text-6xl dark:text-white">
          Para quem quer comer bem, todos os dias.
        </h1>
        <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
          Invista na sua saúde e descubra como é simples transformar sua
          alimentação em um momento de cuidado e prazer.
        </p>

        <Slider {...settings}>
          {categories &&
            categories.map((category) => (
              <div className="p-1">
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="w-full inline-flex justify-center items-center border py-3 px-5 text-base font-medium text-center text-green-700 rounded-full bg-green-50 hover:bg-green-800 hover:text-white focus:ring-4 focus:ring-green-300"
                >
                  {category.title}
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default CategoriesComponent;
