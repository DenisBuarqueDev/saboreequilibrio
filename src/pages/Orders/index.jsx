import React from "react";
import { FaBell } from "react-icons/fa";
import History from "../../components/History";
import { useAuthValue } from "../../context/AuthContextProvider";

const index = () => {
  const { user } = useAuthValue();

  return (
    <main className="flex flex-col w-full p-2 md:py-4">
      <section className="max-w-screen-xl w-full flex flex-col mx-auto">
        <h1 className="flex items-center text-green-700 text-2xl font-bold mb-4">
          <FaBell className="mr-2" />
          Pedidos
        </h1>
        <div className="w-full">
          <History userId={user.id} />
        </div>
      </section>
    </main>
  );
};

export default index;
