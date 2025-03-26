import React, { useEffect } from 'react';
import { useFavorito } from '@stores/favorito/favoritoStore';
import { Favorito, ProdutoFavorito } from '@domains/Favoritos';
import ContainerItems from '@components/ContainerItems/containerItems';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import './style.css';
import ProductCard from '@components/ProductCard/productCard';
import { useMockFavorito } from '@hooks/useMockFavoritos';

const FavoritosPage: React.FC = () => {
  const { 
    favoritos, 
    loading, 
    deletingIds, 
    fetchFavoritoData, 
    handleRemoverFavorito 
  } = useMockFavorito(); //useFavorito();

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
    <div className="contanier-fav">
      
      {favoritos.map((favorito, index) => (
        <ContainerItems 
        key={favorito.sebo.id} 
        title={favorito.sebo.nome} 
        backgroundBege={index % 2 === 0}
        isFirst={index === 0}
      >
        <div className="carrosel-fav">
          {favorito.produtos.map((itemFavorito: ProdutoFavorito) => (
            <div key={itemFavorito.produto.id} className="carrosel-item-fav">
              <div className="favorite-card-wrapper">
                <ProductCard
                  image={itemFavorito.produto.fotos[0]}
                  name={itemFavorito.produto.nome}
                  owner={favorito.sebo.nome}
                  price={itemFavorito.produto.preco}
                  createdAt={new Date()}
                />
              </div>
            </div>
          ))}
        </div>
      </ContainerItems>
      ))}
    </div>
  );
};

export default FavoritosPage;