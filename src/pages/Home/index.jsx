import React from "react";
import CategoriesComponent from "../../components/CategoriesComponent";
import CombinesComponent from "../../components/CombinesComponent";
import SaladsComponent from "../../components/SaladsComponent";

const Home = () => {
  return (
    <main className="flex flex-col">
      <CategoriesComponent />
      <CombinesComponent />
      <SaladsComponent />
    </main>
  );
};

export default Home;
