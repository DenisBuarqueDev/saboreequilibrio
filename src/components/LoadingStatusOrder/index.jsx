import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

const index = ({ orderId }) => {
  const [status, setStatus] = useState("");
  const [lastStatus, setLastStatus] = useState("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await api.get(`/api/orders/${orderId}`);
        const newStatus = res.data[0]?.status;

        // Verifica se houve mudança
        if (newStatus !== lastStatus) {
          setStatus(newStatus);
          setLastStatus(newStatus);
        }

        // Exemplo: alerta quando mudar
          if (lastStatus) {
            toast.success(`Status atualizado: ${newStatus}`);
          }

      } catch (err) {
        console.error("Erro ao buscar status:", err);
      }
    };

    // Buscar imediatamente
    fetchStatus();

    // Buscar a cada 5 segundos
    const interval = setInterval(fetchStatus, 5000);

    // Limpar quando desmontar o componente
    return () => clearInterval(interval);
  }, [orderId, lastStatus]);

  return (
    <span
      className={`text-[12px] ${status === "preparando" && "bg-blue-600"} ${
        status === "entrega" && "bg-orange-600"
      } ${
        status === "finalizado" && "bg-green-600"
      } px-2 py-1 text-white rounded-full mr-2`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1) || "Carregando..."}
    </span>
  );
};

export default index;
