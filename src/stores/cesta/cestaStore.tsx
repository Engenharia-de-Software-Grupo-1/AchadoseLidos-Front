import React, { createContext, useContext, useState } from 'react';
import { Cesta, ProdutoCesta } from '@domains/Cesta';
import { getCesta, removeProductCesta, updateProductQuantCesta } from '@routes/routesCesta';
import { useNotification } from '@contexts/notificationContext';

interface CestaContextType {
  cestas: Cesta[];
  loading: boolean;
  deletingIds: number[];
  updatingProducts: Set<number>;
  fetchCestaData: () => Promise<void>;
  handleDeleteItem: (productId: number) => Promise<void>;
  handleQuantityChange: (productId: number, newQuantity: number) => Promise<void>;
  calculateStoreTotals: (produtos: ProdutoCesta[]) => { quantityTotal: number; lineTotal: number };
}

const CestaContext = createContext<CestaContextType | undefined>(undefined);

export const CestaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  const [cestas, setCestas] = useState<Cesta[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [updatingProducts, setUpdatingProducts] = useState<Set<number>>(new Set());

  const fetchCestaData = async () => {
    try {
      setLoading(true);
      const response = await getCesta();
      if (response.status == 200) {
        setCestas(response.data);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        showNotification('warn', null, 'Faça login para acessar a cesta.');
      } else if (error.response) {
        const errorMessage = error.response.data.message || 'Erro no servidor.';
        showNotification('error', null, errorMessage);
      } else if (error.request) {
        showNotification('error', null, 'Sem resposta do servidor. Verifique sua conexão.');
      } else {
        showNotification('error', null, 'Algo deu errado. Tente novamente mais tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (productId: number) => {
    setDeletingIds(prev => [...prev, productId]); 
    
    try {
      await removeProductCesta(productId);
      setCestas(prev => 
        prev.map(store => ({
          ...store,
          produtos: store.produtos.filter(p => p.produto.id !== productId)
        }))
      );
      showNotification('success', 'Item removido!', '');
    } catch (error) {
      showNotification('error', 'Falha ao remover item', '');
    } finally {
      setDeletingIds(prev => prev.filter(id => id !== productId));
    }
  };

  const handleQuantityChange = async (productId: number, newQuantity: number) => {
    try {
      setCestas(prev => prev.map(store => ({
        ...store,
        produtos: store.produtos.map(produto => 
          produto.produto.id === productId
            ? { ...produto, quantidade: newQuantity }
            : produto
        )
      })));

      setUpdatingProducts(prev => new Set(prev).add(productId));
      await updateProductQuantCesta(productId, { quantidade: newQuantity });
    } catch (error) {
      const freshData = await getCesta();
      setCestas(freshData.data);
    } finally {
      setUpdatingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const calculateStoreTotals = (produtos: ProdutoCesta[]) => {
    return produtos.reduce((acc, produto) => ({
      quantityTotal: acc.quantityTotal + produto.quantidade,
      lineTotal: acc.lineTotal + (produto.produto.preco * produto.quantidade)
    }), { quantityTotal: 0, lineTotal: 0 });
  };

  return (
    <CestaContext.Provider value={{
      cestas,
      loading,
      deletingIds,
      updatingProducts,
      fetchCestaData,
      handleDeleteItem,
      handleQuantityChange,
      calculateStoreTotals
    }}>
      {children}
    </CestaContext.Provider>
  );
};

export const useCesta = () => {
  const context = useContext(CestaContext);
  if (context === undefined) {
    throw new Error('useCesta must be used within a CestaProvider');
  }
  return context;
};