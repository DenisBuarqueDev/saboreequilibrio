import React, { useState, useEffect } from "react";
import { useAuthValue } from "../../context/AuthContextProvider";
import UserProfile from "../../components/UserProfile/Profile";
import AddressProfile from "../../components/UserProfile/AddressProfile";

const index = () => {
  const { user } = useAuthValue();

  return (
    <main className="flex flex-col w-full p-4 md:py-4">
      <section className="max-w-screen-md w-full flex flex-col mx-auto">
        {user && <UserProfile userId={user.id} />}
        {user && <AddressProfile userId={user.id} />}
      </section>
    </main>
  );
};

export default index;
