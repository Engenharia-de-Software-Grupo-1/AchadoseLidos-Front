import React, { useEffect } from 'react';
import { useFavorito } from '@stores/favorito/favoritoStore';
import { Favorito, ProdutoFavorito } from '@domains/Favoritos';
import ContainerItems from '@components/ContainerItems/containerItems';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import './style.css';
import ProductCard from '@components/ProductCard/productCard';

const FavoritosPage: React.FC = () => {
  const { 
    favoritos, 
    loading, 
    deletingIds, 
    fetchFavoritoData, 
    handleRemoverFavorito 
  } = useFavorito();

  useEffect(() => {
    fetchFavoritoData();
  }, []);

  if (loading) {
    return <div className="flex justify-content-center p-4">
      <ProgressSpinner />
    </div>;
  }

  if (!favoritos || favoritos.length === 0) {
    return (
        <div className="favorito-container">
        <div className="empty-favorito" style={{justifyContent:'center'}}>
          <i className="pi pi-heart" style={{ fontSize: '3rem', color: 'var(--Achados-Black)' }} />
          <h3>Você não possui nenhum favorito</h3>
          <p>Adicione itens para continuar</p>
          <Button 
            label="Voltar às compras" 
            icon="pi pi-arrow-left"
            className="p-button-text"
            onClick={() => window.location.href = '/'}
            style={{color:'var(--Achados-OffWhite)', backgroundColor: 'var(--Achados-Success)'}}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Meus Favoritos</h1>
      
      {favoritos.map((favorito, index) => (
        <ContainerItems 
          key={favorito.sebo.id} 
          title={favorito.sebo.nome} 
          backgroundBege={index % 2 === 0}
          isFirst={index === 0}
        >
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {favorito.produtos.map((itemFavorito: ProdutoFavorito) => (
              <div 
                key={itemFavorito.produto.id} 
                className="flex-shrink-0 w-48 border rounded-lg p-4 relative"
              >
                <ProductCard
                    image={itemFavorito.produto.fotos[0]}
                    name={itemFavorito.produto.nome}
                    owner={favorito.sebo.nome}
                    price={itemFavorito.produto.preco}
                    createdAt = { new Date() }
                />
                
                <button
                  onClick={() => handleRemoverFavorito(itemFavorito.produto.id)}
                  disabled={deletingIds.includes(itemFavorito.produto.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 disabled:opacity-50"
                >
                  {deletingIds.includes(itemFavorito.produto.id) ? '...' : '✕'}
                </button>
              </div>
            ))}
          </div>
        </ContainerItems>
      ))}
    </div>
  );
};

export default FavoritosPage;