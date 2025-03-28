import Banner from '@components/Banner/banner';
import TemplatePage from '@pages/templatePage';
import './style.css';
import ContainerItems from '@components/ContainerItems/containerItems';
import ProductCard, { ProductCardProps } from '@components/ProductCard/productCard';
import { getAllProducts } from '@routes/routesProduto';
import { useEffect, useState } from 'react';
import GenericCard, { GenericCardProps } from '@components/GenericCard/genericCard';
import { getAll } from '@routes/routesSebo';
import { Sebo } from '@domains/Sebo';
import { Carousel } from 'primereact/carousel';

const HomePage = () => {
  const images = ['/images/banner.jpg'];
  const [produtos, setProdutos] = useState<ProductCardProps[]>([]);
  const [livros, setLivros] = useState<ProductCardProps[]>([]);
  const [sebos, setSebos] = useState<GenericCardProps[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await getAllProducts({
        filters: [],
        sorters: [],
      });
      setProdutos(
        response.map((item) => {
          return {
            name: item.nome,
            image: item.fotos && item.fotos.length > 0 ? item.fotos[0] : '/images/sem_foto.png',
            owner: item.sebo.nome,
            price: item.preco,
            createdAt: item.createdAt,
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
            name: item.nome,
            image: item.fotos && item.fotos.length > 0 ? item.fotos[0] : '/images/sem_foto.png',
            owner: item.sebo.nome,
            price: item.preco,
            createdAt: item.createdAt,
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
          id: sebo.id,
          title: sebo.nome,
          description: sebo.endereco?.bairro || 'Campina Grande',
          imageUrl: sebo.fotoPerfil ? sebo.fotoPerfil : '/images/sem_foto.png',
          topLabel: sebo.endereco?.bairro || 'Campina Grande',
          isButtonVisible: true,
        }))
      );
    };

    fetchProdutos();
    fetchSebos();
    fetchLivros();
  }, []);

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
        <ContainerItems title="Todos os produtos" backgroundBege={true}>
          <div className="carrousel-product">
            <Carousel
              value={produtos}
              numVisible={3}
              numScroll={3}
              itemTemplate={(produto: ProductCardProps) => <ProductCard {...produto} />}
            />
          </div>
        </ContainerItems>
        <ContainerItems title="Sebos" backgroundBege={true}>
          <div className="carrousel-sebo">
            <Carousel
              value={sebos}
              numVisible={3}
              numScroll={3}
              itemTemplate={(sebo: GenericCardProps) => <GenericCard {...sebo} />}
            />
          </div>
        </ContainerItems>
        <ContainerItems title="Livros" backgroundBege={false}>
          <div className="carrousel-product">
            <Carousel
              value={livros}
              numVisible={3}
              numScroll={3}
              itemTemplate={(livro: ProductCardProps) => <ProductCard {...livro} />}
            />
          </div>
        </ContainerItems>
      </div>
    </TemplatePage>
  );
};

export default HomePage;
