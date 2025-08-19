import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaSave, FaTrash } from "react-icons/fa";
import { MdNoPhotography } from "react-icons/md";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const index = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [image, setImage] = useState(null); // nova imagem
  const [preview, setPreview] = useState(null); // preview da nova imagem
  const [currentImage, setCurrentImage] = useState(null); // imagem atual do usuário
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Buscar imagem atual do usuário
  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/users/${id}`, {
          withCredentials: true,
        });

        if (data.data.image) {
          setCurrentImage(`${import.meta.env.VITE_API_URL}${data.data.image}`);
        }
      } catch (error) {
        console.error("Erro ao carregar imagem do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserImage();
  }, [id]);

  // Quando selecionar nova imagem
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Manipula o envio do formulário
  const handlePhoto = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Selecione uma imagem antes de enviar.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const response = await api.put(`/api/users/photo/${id}`, formData, {
        withCredentials: true,
      });

      toast.success(response.data.message);

      // Atualiza a imagem atual no perfil sem reload
      setCurrentImage(preview);
      setPreview(null);
      setImage(null);
      navigate("/perfil");
    } catch (err) {
      toast.error(err.response.data.error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center justify-center h-56 max-w-sm bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
      >
        <svg
          className="w-10 h-10 text-gray-200 dark:text-gray-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 16 20"
        >
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <main className="flex items-center justify-center w-full p-4 mb-10 md:py-4">
      <section className="max-w-screen-sm w-full mx-auto p-2">
        <div className="flex items-center justify-center w-full">
          {preview ? (
            <div>
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
              />
            </div>
          ) : (
            <>
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Foto atual"
                  className="w-32 h-32 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                />
              ) : (
                <div className="flex items-center justify-center w-32 h-32 text-white text-sm rounded-full bg-gray-400">
                  <MdNoPhotography />
                </div>
              )}
            </>
          )}
        </div>

        <h1 className="text-xl font-semibold mb-2">Foto Perfil</h1>
        <p className="mb-3 text-gray-400 text-sm">
          Adicionar uma foto de perfil em nossa plataforma, isso transmite
          confiança e compromisso, sua foto ajuda a humanizar nosso atendimento,
          tornando a comunicação mais próxima e pessoal. Adicione uma foto clara
          e bem escolhida para melhorar a experiência entre a plataforma e o
          cliente.
        </p>

        <form onSubmit={handlePhoto}>
          <input
            className="block w-full text-md p-1 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            name="imagem"
            accept="image/*"
            onChange={handleFileChange}
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Adicone somente imagem JPG, JPEG ou PNG (Max. 400 x 400px).
          </p>

          <div className="flex items-center justify-between mt-3">
            {!loading && (
              <button
                disabled={loading}
                type="submit"
                className="flex items-center text-white bg-green-700 hover:bg-green-800 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <FaSave className="mr-2 w-3 h-3" /> Salvar
              </button>
            )}

            {loading && (
              <button
                disabled
                type="button"
                class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  role="status"
                  class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            )}

            <Link
              to="/perfil"
              className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              <FaTrash />
              Cancelar
            </Link>
          </div>
        </form>

        {message && <p>{message}</p>}
      </section>
    </main>
  );
};

export default index;
