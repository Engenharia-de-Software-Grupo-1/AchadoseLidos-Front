import Banner from '@components/Banner/banner';
import TemplatePage from '@pages/template';
import './style.css';
import ContainerItems from '@components/ContainerItems/containerItems';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import { getAllProducts } from '@routes/routesProduto';
import { useEffect, useState } from 'react';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import { getAll } from '@routes/routesSebo';
import { Sebo } from '@domains/Sebo';
import { Carousel } from 'primereact/carousel';
import useWindowSize from '@hooks/useWindowSize';
import { CARD_SIZES } from 'constants/carousel';
import { useNavigate } from 'react-router-dom';


const HomePage = () => {
  const images = ['/images/altbanner.png', '/images/banner.jpg'];

  const [produtos, setProdutos] = useState<ProductCardProps[]>([]);
  const [livros, setLivros] = useState<ProductCardProps[]>([]);
  const [sebos, setSebos] = useState<GenericCardProps[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await getAllProducts({
        filters: [],
        sorters: [],
      });
      setProdutos(
        response.map((item) => {
          return {
            id: item.id,
            name: item.nome,
            image: item.fotos && item.fotos.length > 0 ? item.fotos[0].url : '/images/sem_foto.png',
            owner: item.sebo?.nome ?? '',
            price: item.preco,
            begeBackground: true,
          };
        })
      );
    };

    const fetchLivros = async () => {
      const response = await getAllProducts({
        filters: [{ campo: 'categoria', operador: 'in', valor: ['LIVRO'] }],
        sorters: [],
      });
      setLivros(
        response.map((item) => {
          return {
            id: item.id,
            name: item.nome,
            image: item.fotos && item.fotos.length > 0 ? item.fotos[0].url : '/images/sem_foto.png',
            owner: item.sebo?.nome ?? '',
            price: item.preco,
            begeBackground: true,
          };
        })
      );
    };

    const fetchSebos = async () => {
      const response = await getAll({
        filters: [],
        sorters: [],
      });
      setSebos(
        response.map((sebo: Sebo) => ({
          seboId: sebo.id,
          title: sebo.nome,
          description: sebo.endereco?.bairro || 'Campina Grande',
          imageUrl: sebo.fotoPerfil ? sebo.fotoPerfil : '/images/sem_foto.png',
          topLabel: sebo.endereco?.bairro || 'Campina Grande',
          isButtonVisible: true,
          isOffWhiteFrills: false,
        }))
      );
    };

    fetchProdutos();
    fetchSebos();
    fetchLivros();
  }, []);

  const handleAcessProductPage = (id: number) => {
    navigate(`/product/${id}`);
  };

  const handleAcessSeboPage = (id: number) => {
    navigate(`/profile/sebo/${id}`);
  };

  const { width } = useWindowSize();

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

  const seboSettings = {
    visible: calculateVisibleItems(
      CARD_SIZES.SEBO.BASE_WIDTH,
      CARD_SIZES.SEBO.GAP,
      CARD_SIZES.SEBO.MIN_VISIBLE
    ),
    scroll: 1,
    width: `${CARD_SIZES.SEBO.BASE_WIDTH}px`,
  };

  return (
    <TemplatePage simpleHeader={false} simpleFooter={false} backgroundFooterDiff={true}>
      <div className="main-context">
        <Banner images={images} showIndicators={true} />
        <div>
          <p className="main-p1">Explore itens de segunda mão!</p>
          <p className="main-p2">ACHADOS E LIDOS</p>
          <p className="main-p3">é o catálogo virtual dos sebos de Campina Grande!</p>
        </div>

        <img src="/images/underline.svg" alt="underline" style={{ marginTop: '42px', marginBottom: '42px' }} />
        <ContainerItems title="Todos os produtos" backgroundBege={false} isFirst={true}>
          <div className="carrousel-product">
            <Carousel
              value={produtos}
              numVisible={productSettings.visible}
              numScroll={productSettings.scroll}
              itemTemplate={(produto: ProductCardProps) => (
                <div style={{ 
                  cursor: 'pointer',
                  width: productSettings.width,
                  padding: `0 ${CARD_SIZES.PRODUCT.GAP / 2}px`
                }} onClick={() => produto.id !== undefined && handleAcessProductPage(produto.id)}>
                  <ProductCard {...produto} />
                </div>
              )}
              circular
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
            />
          </div>
        </ContainerItems>
        <ContainerItems title="Sebos" backgroundBege>
          <div className="carrousel-sebo">
            <Carousel
              value={sebos}
              numVisible={seboSettings.visible}
              numScroll={seboSettings.scroll}
              itemTemplate={(sebo: GenericCardProps) => (
                <div style={{ 
                  cursor: 'pointer',
                  width: seboSettings.width,
                  padding: `0 ${CARD_SIZES.SEBO.GAP / 2}px`
                }} 
                onClick={() => sebo.seboId !== undefined && handleAcessSeboPage(sebo.seboId)}>
                  <GenericCard {...sebo} />
                </div>
              )}
              style={{ height: 'fit-content' }}
              circular
              responsiveOptions={[
                {
                  breakpoint: '1400px',
                  numVisible: Math.max(2, seboSettings.visible - 2),
                  numScroll: 1 
                },
                {
                  breakpoint: '992px',
                  numVisible: Math.max(2, seboSettings.visible - 2),
                  numScroll: 1 
                },
                {
                  breakpoint: '576px',
                  numVisible: 1,
                  numScroll: 1 
                }
              ]}
            />
          </div>
        </ContainerItems>
        <ContainerItems title="Livros" backgroundBege={false}>
          <div className="carrousel-product">
            <Carousel
              value={livros}
              numVisible={productSettings.visible}
              numScroll={productSettings.scroll}
              itemTemplate={(livro: ProductCardProps) => (
                <div style={{ 
                  cursor: 'pointer',
                  width: productSettings.width,
                  padding: `0 ${CARD_SIZES.PRODUCT.GAP / 2}px`
                }}
                onClick={() => livro.id !== undefined && handleAcessProductPage(livro.id)}>
                  <ProductCard {...livro} />
                </div>
              )}
              circular
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
            />
          </div>
        </ContainerItems>
      </div>
    </TemplatePage>
  );
};

export default HomePage;
