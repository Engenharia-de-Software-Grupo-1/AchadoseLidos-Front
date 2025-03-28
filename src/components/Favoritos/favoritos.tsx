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

const FavoritosPage: React.FC = () => {
  // const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const imageDefault = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEIDCFVUSkqV6O5Wr69FuhjhOqwv484t75Mw&s';
  const navigate = useNavigate();
  const { favoritos, loading, fetchFavoritoData } = useFavorito();

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

  const handleProductClick = (produtoId: number) => {
    navigate(`/product/${produtoId}`);
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
          <div className="carrousel-fav-t">
            <Carousel
              value={favorito.produtos}
              itemTemplate={(itemFavorito: ProdutoFavorito) => (
                <div
                  key={itemFavorito.produto.id}
                  className="carrosel-item-fav"
                  onClick={() => handleProductClick(itemFavorito.produto.id)}
                >
                  <div className="favorite-card-wrapper">
                    <ProductCard
                      image={
                        typeof itemFavorito.produto.fotos?.[0] === 'object' && 'url' in itemFavorito.produto.fotos[0]
                          ? (itemFavorito.produto.fotos[0] as { url: string }).url
                          : imageDefault
                      }
                      name={itemFavorito.produto.nome}
                      owner={favorito.sebo.nome}
                      price={itemFavorito.produto.preco}
                      backgroundBege
                    />
                  </div>
                </div>
              )}
              numVisible={8}
              numScroll={1}
              responsiveOptions={[
                {
                  breakpoint: '1400px',
                  numVisible: 6,
                  numScroll: 6,
                },
                {
                  breakpoint: '1199px',
                  numVisible: 5,
                  numScroll: 5,
                },
                {
                  breakpoint: '991px',
                  numVisible: 4,
                  numScroll: 4,
                },
                {
                  breakpoint: '767px',
                  numVisible: 3,
                  numScroll: 3,
                },
                {
                  breakpoint: '575px',
                  numVisible: 2,
                  numScroll: 2,
                },
              ]}
              circular
              style={{ width: '100%' }}
              showIndicators={false}
            />
          </div>
        </ContainerItems>
      ))}
    </div>
  );
};

export default FavoritosPage;
