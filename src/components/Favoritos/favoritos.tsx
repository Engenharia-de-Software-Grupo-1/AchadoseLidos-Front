import React, { useEffect } from 'react';
import { useFavorito } from '@stores/favorito/favoritoStore';
import { ProdutoFavorito } from '@domains/Favoritos';
import ContainerItems from '@components/ContainerItems/containerItems';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import './style.css';
import ProductCard from '@components/ProductCard/productCard';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';
import useWindowSize from '@hooks/useWindowSize';
import { CARD_SIZES } from 'constants/carousel';

const FavoritosPage: React.FC = () => {
  const imageDefault = '/images/sem_foto.png';
  const navigate = useNavigate();
  const { favoritos, loading, fetchFavoritoData } = useFavorito();
  const { width } = useWindowSize();

  useEffect(() => {
    fetchFavoritoData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-content-center p-4">
        <ProgressSpinner />
      </div>
    );
  }

  if (!favoritos || favoritos.length === 0) {
    return (
      <div className="favorito-container">
        <div className="empty-favorito" style={{ justifyContent: 'center' }}>
          <i className="pi pi-heart" style={{ fontSize: '3rem', color: 'var(--Achados-Black)' }} />
          <h3>Você não possui nenhum favorito</h3>
          <p>Adicione itens para continuar</p>
          <Button
            label="Voltar às compras"
            icon="pi pi-arrow-left"
            className="p-button-text"
            onClick={() => (window.location.href = '/')}
            style={{ color: 'var(--Achados-OffWhite)', backgroundColor: 'var(--Achados-Success)' }}
          />
        </div>
      </div>
    );
  }

  const calculateVisibleItems = (cardWidth: number, gap: number, minVisible: number) => {
    const availableWidth = width - 32; // Account for container padding
    return Math.max(minVisible, Math.floor(availableWidth / (cardWidth + gap)));
  };

  const productSettings = {
    visible: calculateVisibleItems(
      CARD_SIZES.PRODUCT.BASE_WIDTH,
      CARD_SIZES.PRODUCT.GAP,
      CARD_SIZES.PRODUCT.MIN_VISIBLE
    ),
    scroll: 1,
    width: `${CARD_SIZES.PRODUCT.BASE_WIDTH}px`,
  };

  const handleProductClick = (produtoId: number) => {
    navigate(`/product/${produtoId}`);
  };

  return (
    <div className="contanier-fav">
      {favoritos.map((favorito, index) => (
        <ContainerItems
          idSebo={favorito.sebo.id}
          key={favorito.sebo.id}
          title={favorito.sebo.nome}
          backgroundBege={index % 2 === 0}
          isFirst={index === 0}
        >
          <div className="carrousel-fav-t">
            <Carousel
              value={favorito.produtos}
              numVisible={productSettings.visible}
              numScroll={productSettings.scroll}
              itemTemplate={(itemFavorito: ProdutoFavorito) => (
                <div
                  key={itemFavorito?.id}
                  className="carrosel-item-fav"
                  onClick={() => handleProductClick(itemFavorito.id)}
                  
                >
                  <div className="favorite-card-wrapper"
                  style={{ 
                    width: productSettings.width,
                    padding: `0 ${CARD_SIZES.PRODUCT.GAP / 2}px`
                  }}>
                    <ProductCard
                      image={itemFavorito?.fotos?.length ? itemFavorito.fotos[0].url : imageDefault}
                      name={itemFavorito?.nome}
                      owner={favorito?.sebo?.nome}
                      price={itemFavorito?.preco}
                      begeBackground={index % 2 === 0 ? false : true}
                    />
                  </div>
                </div>
              )}
              
              responsiveOptions={[
                {
                  breakpoint: '1400px',
                  numVisible: Math.max(2, productSettings.visible - 2),
                  numScroll: 1 
                },
                {
                  breakpoint: '992px',
                  numVisible: Math.max(2, productSettings.visible - 2),
                  numScroll: 1 
                },
                {
                  breakpoint: '576px',
                  numVisible: 1,
                  numScroll: 1 
                }
              ]}
              circular
              showIndicators={false}
            />
          </div>
        </ContainerItems>
      ))}
    </div>
  );
};

export default FavoritosPage;
