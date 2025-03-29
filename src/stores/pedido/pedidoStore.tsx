import React, { createContext, useContext, useState } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { PedidoList } from '@domains/Pedido';
import { getAll } from '@routes/routesPedido';

interface PedidoContextType {
  pedidos: PedidoList[];
  loading: boolean;
  initialize: (sucessCallback?: () => void) => Promise<void>;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  const [pedidos, setPedidos] = useState<PedidoList[]>([]);
  const [loading, setLoading] = useState(true);

  const initialize = async (sucessCallback?: () => void) => {
    setLoading(true);
    try {
      const data = await getAll({
        filters: [],
        sorters: [],
      });
      setPedidos(data);
      sucessCallback && sucessCallback();
    } catch (error) {
      showNotification('error', null, 'Erro ao buscar pedidos');
    } finally {
      setLoading(false);
    }
  };


  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        loading,
        initialize,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
};

export const usePedido = () => {
  const context = useContext(PedidoContext);
  if (context === undefined) {
    throw new Error('usePedido must be used within a PedidoProvider');
  }
  return context;
};
