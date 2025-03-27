import React, { useEffect, useState } from 'react';
import { useFavorito } from '@stores/favorito/favoritoStore';
import { Favorito, ProdutoFavorito } from '@domains/Favoritos';
import ContainerItems from '@components/ContainerItems/containerItems';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import './style.css';
import ProductCard from '@components/ProductCard/productCard';
import { useMockFavorito } from '@hooks/useMockFavoritos';
import { Carousel } from 'primereact/carousel';
import { useNavigate } from 'react-router-dom';
import { forInRight } from 'cypress/types/lodash';
import { getFavoritos } from '@routes/routesFavorito';

const FavoritosPage: React.FC = () => {
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const navigate = useNavigate();
  const { 
   // favoritos, 
    loading, 
    deletingIds, 
    fetchFavoritoData, 
    handleRemoverFavorito 
  } = useFavorito();

  useEffect(() => {
    myFavoritos();
  }, []);

  const myFavoritos = async() => {
    try {
      const favoritos = await getFavoritos();
      console.log(favoritos);
      setFavoritos(favoritos);
    } catch(error) {
      console.error('Erro ao buscar favoritos', error);
    }
  };

  // if (loading) {
  //   return <div className="flex justify-content-center p-4">
  //     <ProgressSpinner />
  //   </div>;
  // }

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
 

  const handleSeboClick = (seboId: number) => {
    navigate(`/profile/sebo/${seboId}`);
  };

  const handleProductClick = (produtoId: number) => {
    navigate(`/product-page/${produtoId}`);
  };

  return (
    <div className="contanier-fav">
      {favoritos.map((favorito, index) => (
        <ContainerItems
          key={favorito.sebo.id} 
          title={favorito.sebo.nome}
          backgroundBege={index % 2 === 0}
          isFirst={index === 0}
        >
          <div className='carrousel-fav-t'>
          <Carousel
            value={favorito.produtos}
            itemTemplate={(itemFavorito: ProdutoFavorito) => (
              <div key={itemFavorito.produto.id} className="carrosel-item-favsssssssssssss" onClick={() => handleProductClick(itemFavorito.produto.id)}>
                <div className="favorite-card-wrapper">
                  <ProductCard
                    image={itemFavorito.produto.fotos?.[0]}
                    name={itemFavorito.produto.nome}
                    owner={favorito.sebo.nome}
                    price={itemFavorito.produto.preco}
                    backgroundBege
                  />
                </div>
              </div>
            )}
            numVisible={6}
            numScroll={1}
            responsiveOptions={[
              {
                breakpoint: '1400px',
                numVisible: 6,
                numScroll: 6
              },
              {
                breakpoint: '1199px',
                numVisible: 5,
                numScroll: 5
              },
              {
                breakpoint: '991px',
                numVisible: 4,
                numScroll: 4
              },
              {
                breakpoint: '767px',
                numVisible: 3,
                numScroll: 3
              },
              {
                breakpoint: '575px',
                numVisible: 2,
                numScroll: 2
              }
            ]}
            circular={true}
            style={{width: '100%'}}
            showIndicators={false}

          />
          </div>
        </ContainerItems>
        
      ))}
    </div>
  );
};

export default FavoritosPage;