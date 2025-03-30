import React, { createContext, useContext, useEffect, useState } from 'react';
import { Favorito } from '@domains/Favoritos';
import { getFavoritos, adicionarFavorito, removerFavorito } from '@routes/routesFavorito';
import { useNotification } from '@contexts/notificationContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@contexts/authContext';

interface FavoritoContextType {
  favoritos: Favorito[];
  loading: boolean;
  deletingIds: number[];
  addingIds: number[];
  fetchFavoritoData: () => Promise<void>;
  handleAdicionarFavorito: (productId: number) => Promise<void>;
  handleRemoverFavorito: (productId: number) => Promise<void>;
  getFavoritosAgrupados: () => Favorito[];
  handleSeboClick: (seboId: number) => void;
  handleProdutoClick: (produtoId: number) => void;
  isFavoriteProduct: (id: any) => void;
  isFavorite: boolean;
}

const FavoritoContext = createContext<FavoritoContextType | undefined>(undefined);

export const FavoritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showNotification } = useNotification();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [addingIds, setAddingIds] = useState<number[]>([]);
  const { conta } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchFavoritoData = async () => {
    try {
      setLoading(true);
      const response = await getFavoritos();
      setFavoritos(response);
    } catch (error: any) {
      console.error('Erro ao buscar favoritos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdicionarFavorito = async (productId: number) => {
    setAddingIds((prev) => [...prev, productId]);
    try {
      if (conta?.usuario?.id !== undefined) {
        await adicionarFavorito(productId, conta.usuario.id);
      } else {
        showNotification('error', 'Usuário não autenticado', '');
      }
      await fetchFavoritoData();
      showNotification('success', 'Item favoritado!', '');
    } catch (error) {
      console.error('Erro ao adicionar favorito', error);
      showNotification('error', 'Falha ao adicionar favorito', '');
    } finally {
      setAddingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  useEffect(() => {}, [isFavorite]);

  const handleRemoverFavorito = async (productId: number) => {
    setDeletingIds((prev) => [...prev, productId]);

    try {
      if (conta?.usuario?.id !== undefined) {
        await removerFavorito(productId, conta.usuario.id);
        setFavoritos((prev) =>
          prev
            .map((sebo) => ({
              ...sebo,
              produtos: sebo.produtos.filter((p) => p.id !== productId),
            }))
            .filter((sebo) => sebo.produtos.length > 0)
        );
        await fetchFavoritoData();
        setIsFavorite(false);
      } else {
        showNotification('error', 'Usuário não autenticado', '');
      }

      showNotification('success', 'Item removido dos favoritos!', '');
    } catch (error) {
      showNotification('error', 'Falha ao remover favorito', '');
    } finally {
      setDeletingIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  const isFavoriteProduct = (id: any) => {
    const isFavorited = favoritos.some((favorito) =>
      favorito.produtos.some(
        (item) => item?.id && Number(item.id) === Number(id) // Acesse o id correto do produto
      )
    );
    setIsFavorite(isFavorited);
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
    <FavoritoContext.Provider
      value={{
        favoritos,
        loading,
        deletingIds,
        addingIds,
        fetchFavoritoData,
        handleAdicionarFavorito,
        handleRemoverFavorito,
        isFavoriteProduct,
        isFavorite,
        getFavoritosAgrupados,
        handleSeboClick,
        handleProdutoClick,
      }}
    >
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
