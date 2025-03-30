import React, { createContext, useContext, useState } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { PedidoList } from '@domains/Pedido';
import { createOrder, getAll } from '@routes/routesPedido';
import { FilterOrders } from '@types/NavigationFilters';
import { getById } from '@routes/routesProduto';
import { Cesta, ProdutoCesta } from '@domains/Cesta';
import { Usuario } from '@domains/Usuario';

interface PedidoContextType {
  pedidos: PedidoList[];
  loading: boolean;
  initialize: (body: FilterOrders, sucessCallback?: () => void) => Promise<void>;
  handleCreatePedido: (
    quantityTotal: number,
    lineTotal: number,
    cesta: Cesta,
    user: Usuario,
    sucessCallback?: () => void
  ) => void;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  const [pedidos, setPedidos] = useState<PedidoList[]>([]);
  const [loading, setLoading] = useState(true);

  const initialize = async (body: FilterOrders, sucessCallback?: () => void) => {
    setLoading(true);
    try {
      const data = await getAll(body);
      setPedidos(data);
      sucessCallback && sucessCallback();
    } catch (error) {
      showNotification('error', null, 'Erro ao buscar pedidos');
    } finally {
      setLoading(false);
    }
  };

  const fetchProdutos = async (produtosCesta: ProdutoCesta[]) => {
    try {
      const produtosPedido = await Promise.all(
        produtosCesta.map(async (produtoCesta: ProdutoCesta) => {
          return await getById(produtoCesta.produto.id);
        })
      );
      return produtosPedido;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      return [];
    }
  };

  const criarPedido = async (quantityTotal: number, lineTotal: number, cesta: Cesta, user: Usuario) => {
    try {
      const produtosPedido = await fetchProdutos(cesta?.produtos);

      return {
        sebo: cesta?.sebo,
        usuario: user,
        status: 'PENDENTE',
        qtdProdutos: quantityTotal,
        total: lineTotal,
        produtos: produtosPedido.map((produto) => ({
          produto,
          quantidade: cesta.produtos.find((p) => p.produto.id === produto.id)?.quantidade || 1,
          selected: true,
          status: 'PENDENTE',
        })),
      };
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      return null;
    }
  };

  const handleCreatePedido = async (
    quantityTotal: number,
    lineTotal: number,
    cesta: Cesta,
    user: Usuario,
    sucessCallback?: () => void
  ) => {
    try {
      const pedido = await criarPedido(quantityTotal, lineTotal, cesta, user);
      if (!pedido) {
        console.error('Pedido não foi criado corretamente.');
        return;
      }

      const response = await createOrder(pedido);
      window.open(response?.whatsAppLink, '_blank');
      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao processar pedido:', error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        loading,
        initialize,
        handleCreatePedido,
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
