import React, { createContext, useContext, useState } from 'react';
import { Favorito, ProdutoFavorito } from '@domains/Favoritos';
import { getFavoritos, adicionarFavorito, removerFavorito } from '@routes/routesFavorito';
import { useNotification } from '@contexts/notificationContext';
import { Navigate, useNavigate } from 'react-router-dom';

interface FavoritoContextType {
  favoritos: Favorito[];
  loading: boolean;
  deletingIds: number[];
  addingIds: number[];
  fetchFavoritoData: () => Promise<void>;
  handleAdicionarFavorito: (productId: number) => Promise<void>;
  handleRemoverFavorito: (productId: number) => Promise<void>;
  isProdutoFavoritado: (productId: number) => boolean;
  getFavoritosAgrupados: () => Favorito[];
  handleSeboClick: (seboId: number) => void;
  handleProdutoClick: (produtoId: number) => void;
}

const FavoritoContext = createContext<FavoritoContextType | undefined>(undefined);

export const FavoritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [addingIds, setAddingIds] = useState<number[]>([]);

  const fetchFavoritoData = async () => {
    try {
      setLoading(true);
      const response = await getFavoritos();
      if (response.status === 200) {
        setFavoritos(response.data);
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        showNotification('warn', null, 'Faça login para acessar seus favoritos.');
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

  const handleAdicionarFavorito = async (productId: number) => {
    setAddingIds(prev => [...prev, productId]);

    try {
      await adicionarFavorito(productId);
      await fetchFavoritoData(); // Recarrega os dados para garantir consistência
      showNotification('success', 'Item favoritado!', '');
    } catch (error) {
      showNotification('error', 'Falha ao favoritar item', '');
    } finally {
      setAddingIds(prev => prev.filter(id => id !== productId));
    }
  };

  const handleRemoverFavorito = async (productId: number) => {
    setDeletingIds(prev => [...prev, productId]);

    try {
      await removerFavorito(productId);
      // Atualização otimista mantendo a estrutura de agrupamento
      setFavoritos(prev => 
        prev.map(sebo => ({
          ...sebo,
          produtos: sebo.produtos.filter(p => p.produto.id !== productId)
        })).filter(sebo => sebo.produtos.length > 0) // Remove sebos sem produtos
      );
      showNotification('success', 'Item removido dos favoritos!', '');
    } catch (error) {
      showNotification('error', 'Falha ao remover favorito', '');
    } finally {
      setDeletingIds(prev => prev.filter(id => id !== productId));
    }
  };

  const isProdutoFavoritado = (productId: number) => {
    return favoritos.some(sebo => 
      sebo.produtos.some(p => p.produto.id === productId)
    );
  };

  const getFavoritosAgrupados = () => {
    return favoritos;
  };

  const navigate = useNavigate();

  const handleSeboClick = (seboId: number) => {
    navigate(`/profile/sebo/${seboId}`);
  };

  const handleProdutoClick = (produtoId: number) => {
    navigate(`/product-page/${produtoId}`);
  };

  return (
    <FavoritoContext.Provider value={{
      favoritos,
      loading,
      deletingIds,
      addingIds,
      fetchFavoritoData,
      handleAdicionarFavorito,
      handleRemoverFavorito,
      isProdutoFavoritado,
      getFavoritosAgrupados,
      handleSeboClick,
      handleProdutoClick
    }}>
      {children}
    </FavoritoContext.Provider>
  );
};

export const useFavorito = () => {
  const context = useContext(FavoritoContext);
  if (context === undefined) {
    throw new Error('useFavorito must be used within a FavoritoProvider');
  }
  return context;
};