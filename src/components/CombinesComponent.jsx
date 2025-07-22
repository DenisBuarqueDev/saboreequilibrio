import { db } from "../firebase/conection";
import { collection, query, limit, getDocs, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CombinesComponent = () => {
  const [combines, setCombines] = useState([]);
  useEffect(() => {
    let isMounted = true; // Flag para checar se o componente ainda está montado

    const getCombines = async () => {
      try {
        const productRef = collection(db, "products");
        const q = query(
          productRef,
          limit(3),
          where("category", "==", "TO1PKDOj1SjRmLpnaDIU")
        );
        const snapshot = await getDocs(q);

        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (isMounted) {
          setCombines(list); // Só atualiza se o componente ainda estiver montado
        }
      } catch (error) {
        console.error("Erro ao buscar os posts:", error);
      }
    };

    getCombines();

    return () => {
      isMounted = false; // ⚠️ Cleanup: marca como desmontado
    };
  }, []);

  const settings = {
    dots: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    autoplay: true,
    lazyLoad: "ondemand",
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          //dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          //dots: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          //dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-white">
      <div className="px-4 mx-auto max-w-screen-xl">
        <h1 className="text-xl font-semibold mb-2">Sadadas Combinadas</h1>

        {/*<div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 p-4 mx-auto max-w-screen-xl text-center">*/}
        <Slider {...settings}>
          {combines &&
            combines.map((combine) => (
              <div className="px-2">
                <div key={combine.id}>
                  <Link
                    to={`/show/${combine.id}`}
                    className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm mb-3 md:flex-row md:max-w-xl md:mb-0 hover:bg-gray-100"
                  >
                    <div
                      className="sm:flex-1"
                      style={{
                        backgroundImage: `url(${combine.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        borderTopLeftRadius: "8px",
                        borderBottomLeftRadius: "8px",
                        width: "100%",
                        height: "180px",
                      }}
                    ></div>

                    <div className="flex flex-col justify-between p-2 leading-normal text-left sm:flex-1">
                      <div>
                        <h5 className="text-xl leading-6 font-bold tracking-tight text-green-700">
                          {combine.title}
                        </h5>
                        <p className="font-normal text-gray-700 text-sm leading-normal">
                          {combine.subtitle}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-orange-600 font-bold">
                          R$ {combine.price.toFixed(2).replace(".", ",")}
                        </h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
        {/*</div>*/}
      </div>
    </section>
  );
};

export default CombinesComponent;
