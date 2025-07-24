import React, { useEffect, useState } from "react";
import { db } from "../../firebase/conection";
import { useAuthentication } from "../../authentication/useAuthentication";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaSave } from "react-icons/fa";

const index = () => {
  const { auth } = useAuthentication();

  const [uid, setUid] = useState(null);
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");

  const address = {
    street,
    number,
    district,
    city: "Maceió",
    state: "Alagoas",
    zipCode,
    complement,
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      const user = auth.currentUser;
      if (user) {
        setUid(user.uid);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data) {
            setZipCode(data.zipCode);
            setStreet(data.street);
            setNumber(data.number);
            setDistrict(data.district);
            setComplement(data.complement);
          }
        }
      }
    };

    fetchUsuario();
  }, []);

  const handleSalvar = async (e) => {
    e.preventDefault();

    if (!uid) return;

    try {
      await setDoc(doc(db, "users", uid), address, { merge: true });
      alert("Endereço atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
    }
  };

  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Perfil</h1>

        <form className="w-full mt-3">
          <div className="grid grid-cols-1 mb-2 md:grid-cols-4 md:gap-2">
            <div className="col-span-1">
              <label
                htmlFor="zip_code"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                * CEP:
              </label>
              <input
                type="text"
                id="zipCode"
                name="zizCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="street"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                * Endereço:
              </label>
              <input
                type="text"
                id="street"
                name="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                required
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="number"
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
              >
                * Número:
              </label>
              <input
                type="text"
                id="number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-2 md:grid-cols-2 md:gap-2">
            <div>
              <label
                htmlFor="districty"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                * Bairro:
              </label>
              <input
                type="text"
                id="district"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="complement"
                className="block mb-1 text-sm font-medium text-gray-900"
              >
                Complemento:
              </label>
              <input
                type="text"
                id="complement"
                name="complement"
                value={complement}
                onChange={(e) => setComplement(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <button
            onClick={handleSalvar}
            className="flex items-center justify-center text-white bg-green-700 mt-2 focus:ring-green-300 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <FaSave className="mr-2" />
            Salvar
          </button>
        </form>
      </section>
    </main>
  );
};

export default index;
