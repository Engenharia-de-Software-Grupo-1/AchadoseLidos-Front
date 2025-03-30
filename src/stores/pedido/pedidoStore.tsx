import React, { createContext, useCallback, useContext, useState } from 'react';
import { useNotification } from '@contexts/notificationContext';
import { Pedido, PedidoList } from '@domains/Pedido';
import { createOrder, getAll, getById } from '@routes/routesPedido';
import { FilterOrders } from 'types/NavigationFilters';
import { getById as getByIdProduto } from '@routes/routesProduto';
import { Cesta, ProdutoCesta } from '@domains/Cesta';
import { Usuario } from '@domains/Usuario';

interface PedidoContextType {
  pedidos: PedidoList[];
  pedido: Pedido;
  loading: boolean;
  loadingPedido: boolean;
  initialize: (body: FilterOrders, sucessCallback?: () => void) => Promise<void>;
  handleCreatePedido: (
    quantityTotal: number,
    lineTotal: number,
    cesta: Cesta,
    user: Usuario,
    sucessCallback?: () => void
  ) => void;
  getPedido: (id: number | undefined) => void;
  handleQuantityChange: (productId: number, quantity: number) => void;
  handleSelectionChange: (productId: number, selected: boolean) => void;
  handleConfirm: (sucessCallback?: () => void) => void;
  handleCancel: (sucessCallback?: () => void) => void;
}

const PedidoContext = createContext<PedidoContextType | undefined>(undefined);

export const PedidoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  const [pedidos, setPedidos] = useState<PedidoList[]>([]);
  const [pedido, setPedido] = useState<Pedido>([]);
  const [loading, setLoading] = useState(true);
  const [loadingPedido, setLoadingPedido] = useState(true);

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
          return await getByIdProduto(produtoCesta.produto.id);
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

  const getPedido = useCallback(async (id: number | undefined) => {
    setLoadingPedido(true);
    try {
      const data = await getById(id);
      setPedido(data);
    } catch (error) {
      showNotification('error', null, 'Erro ao buscar pedido');
    } finally {
      setLoadingPedido(false);
    }
  }, []);

  const handleQuantityChange = (productId: number, quantity: number) => {
    setPedido((prev) => ({
      ...prev,
      produtos: prev.produtos.map((item) => (item.produto.id === productId ? { ...item, quantidade: quantity } : item)),
    }));
  };

  const handleSelectionChange = (productId: number, selected: boolean) => {
    setPedido((prev) => ({
      ...prev,
      produtos: prev.produtos.map((item) => (item.produto.id === productId ? { ...item, selected } : item)),
    }));
  };

  const handleConfirm = async (sucessCallback?: () => void) => {
    try {
      // mudar status do pedido
      showNotification('success', 'Pedido confirmado com sucesso!', '');
      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao confirmar pedido', error);
    }
  };

  const handleCancel = async (sucessCallback?: () => void) => {
    try {
      // mudar status de todos os produtos e do pedido
      showNotification('success', 'Pedido cancelado com sucesso!', '');
      sucessCallback && sucessCallback();
    } catch (error) {
      console.error('Erro ao cancelar pedido', error);
    }
  };

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        loading,
        loadingPedido,
        initialize,
        handleCreatePedido,
        pedido,
        getPedido,
        handleQuantityChange,
        handleSelectionChange,
        handleConfirm, 
        handleCancel
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
