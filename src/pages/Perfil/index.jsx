import React, { useEffect, useState } from "react";
import { db } from "../../firebase/conection";
import { useAuthentication } from "../../authentication/useAuthentication";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { FaSave } from "react-icons/fa";

const index = () => {
  const { auth } = useAuthentication();

  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    street: "",
    number: "",
    zipCode: "",
    complement: "",
    district: "",
    city: "Maceió",
    state: "Alagoas",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Carrega endereço do usuário
  useEffect(() => {
    const fetchAddress = async () => {
      const user = auth.currentUser;
      if (!user) return;

      setUserId(user.uid);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData((prev) => ({
          ...prev,
          ...data,
        }));
      }
    };

    fetchAddress();
  }, []);

  // Manipula mudança nos inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Salva endereço no Firestore
  const handleSave = async (e) => {
    e.preventDefault();

    if (!userId) return;

    const { street, number, zipCode, district } = formData;

    if (!street || !number || !zipCode || !district) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await setDoc(doc(db, "users", userId), formData, { merge: true });
      alert("Endereço salvo com sucesso!");
      return;
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setError("Erro ao salvar o endereço. Tente novamente.");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-md lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Endereço</h1>

        <form className="w-full mt-3 border border-gray-200 rounded-lg bg-white p-4 shadow-md">
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
                value={formData.zipCode}
                onChange={handleChange}
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
                value={formData.street}
                onChange={handleChange}
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
                value={formData.number}
                onChange={handleChange}
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
                value={formData.district}
                onChange={handleChange}
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
                value={formData.complement}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center text-white bg-green-700 mt-2 focus:ring-green-300 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <FaSave className="mr-2" />
              {loading ? "Salvando..." : "Salvar Endereço"}
            </button>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </section>
    </main>
  );
};

export default index;
