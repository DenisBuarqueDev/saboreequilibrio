import React from "react";
import Categories from "../../components/Categories";
import Combaines from "../../components/Combaines";
import Salads from "../../components/Salads";

const index = () => {
  return (
    <main className="max-w-screen-xl flex flex-col items-center mx-auto my-4">
      <Categories />
      <Combaines />
      <Salads />
    </main>
  );
};

export default index;
