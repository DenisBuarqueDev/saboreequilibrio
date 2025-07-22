import React from "react";
import { FaPix } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";

const index = () => {
  return (
    <main className="bg-white">
      <section className="p-3 mx-auto max-w-screen-xl lg:py-8">
        <h1 className="text-2xl font-semibold text-green-700 mb-2">Checkout</h1>

        <div className="flex flex-col gap-2 md:flex-row">
          <div className="flex flex-col flex-1 p-7 rounded border shadow">
            <p><strong>Sr(a). Denis Buarque</strong>, preencha as Informações para entrega do seu pedido.</p>
            <form className="w-full mt-3">
              
              <div className="grid grid-cols-1 mb-2 md:grid-cols-4 md:gap-2">
                <div className="col-span-1">
                  <label
                    htmlFor="cep"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    * CEP:
                  </label>
                  <input
                    type="text"
                    id="cep"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    * Endereço:
                  </label>
                  <input
                    type="text"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label
                    htmlFor="cep"
                    className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    * Número:
                  </label>
                  <input
                    type="text"
                    id="cep"
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
                    id="districty"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="flex flex-col flex-1 p-7 rounded border shadow bg-gray-100">
            <strong>Itens do seu pedido:</strong>
            <ul className="mb-2">
              <li className="flex justify-between">
                <p>1 - Título do produto</p>
                <p>R$ 0,00</p>
              </li>
            </ul>
            <hr />
            <ul className="my-2">
              <li className="flex justify-between">
                <p>SubTotal</p>
                <p>R$ 0,00</p>
              </li>
              <li className="flex justify-between">
                <p>Taxa de entrega</p>
                <p>R$ 0,00</p>
              </li>
            </ul>
            <hr />
            <ul className="my-5">
              <li className="flex justify-between">
                <p>Total</p>
                <strong>R$ 0,00</strong>
              </li>
            </ul>
            <strong className="mb-2">Forma de Pagamento:</strong>

            <ul>
              <li className="flex justify-between items-center border p-1 mb-1">
                <div>
                <input type="radio" name="payment" /> Pix
                </div>
                <FaPix />
              </li>
              <li className="flex justify-between items-center border p-1 mb-1">
                <div>
                <input type="radio" name="payment" /> Cartão de Crédito
                </div>
                <FaCreditCard />
              </li>
              <li className="flex justify-between items-center border p-1">
                <div>
                <input type="radio" name="payment" /> Dinheiro
                </div>
                <FaMoneyBillAlt />
              </li>
            </ul>
            <button
              type="buttom"
              to="/"
              className="block items-center text-white w-full bg-green-700 mt-5 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full px-5 py-2.5 text-center"
            >
              Realizar Pagamento
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default index;
