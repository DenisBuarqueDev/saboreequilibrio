import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/conection";
import { doc, getDoc } from "firebase/firestore";
import { FaClock, FaCartArrowDown, FaPlus } from "react-icons/fa";
import { MdOutlineRemove } from "react-icons/md";
import CategoriesComponent from "../../components/CategoriesComponent";

const index = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [salad, setSalad] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    let isMounted = true; // Flag para checar se o componente ainda está montado

    const getDocument = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (isMounted) {
            setSalad({ id: docSnap.id, ...docSnap.data() });
            setSubtotal(docSnap.data().price * quantity);
          }
        } else {
          console.log("Documento não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar documento:", error);
      }
    };
    getDocument();

    return () => {
      isMounted = false; // ⚠️ Cleanup: marca como desmontado
    };
  }, [id]);

  const increment = () => {
    setQuantity((prev) => prev + 1);
    return;
  };

  const decrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    return;
  };

  // Atualiza subtotal sempre que a quantidade mudar
  useEffect(() => {
    if (salad) {
      setSubtotal(quantity * salad.price);
    }
  }, [quantity, salad]);

  if (!salad) {
    return <p>Carregando...</p>;
  }

  const getCart = () => {
    try {
      const data = localStorage.getItem("cart");
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("Erro ao ler carrinho:", err);
      return [];
    }
  };

  const addToCart = (product) => {
    try {
      const cart = getCart();

      const exists = cart.find((item) => item.title === product.title);
      if (exists) {
        alert("Produto já adicionado ao pedido.");
        return; // evita duplicatas
      }

      const updatedCart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      navigate("/cart");
      setQuantity(1);
    } catch (err) {
      console.error("Erro ao adicionar pedido:", err);
    }
  };

  return (
    <main className="bg-white">
      <CategoriesComponent />

      <div className="max-w-screen-md py-3 px-2 mx-auto lg:py-8">
        <div
          style={{
            backgroundImage: `url(${salad.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "400px",
          }}
        ></div>
        <h1 className="text-2xl font-bold text-orange-500 mt-5">
          {salad.title}
        </h1>
        <h2>{salad.subtitle}</h2>
        <p className="flex mt-5 font-bold">
          R$ {salad.price.toFixed(2).replace(".", ",")}
        </p>
        <p className="flex items-center my-5">
          <FaClock className="mr-2" /> {salad.time}
        </p>
        <p>{salad.description}</p>

        <div className="flex justify-between mt-5">
          <div className="flex items-center">
            <button
              onClick={decrement}
              type="button"
              className="text-white bg-green-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center"
            >
              <MdOutlineRemove className="font-bold" />
            </button>
            <input
              type="text"
              name="quantity"
              value={quantity}
              className="p-1 w-10 text-xl text-center border rounded shadow-sm mx-1"
              readOnly
            />
            <button
              onClick={increment}
              type="button"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-3 text-center inline-flex items-center"
            >
              <FaPlus />
            </button>
          </div>
          <button
            onClick={() =>
              addToCart({
                title: salad.title,
                price: salad.price,
                subtotal: quantity * salad.price,
                qtd: quantity,
                image: salad.image,
              })
            }
            type="button"
            className="flex items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            Adicionar R$ {subtotal.toFixed(2).replace(".", ",")}{" "}
            <FaCartArrowDown className="ml-2" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default index;
